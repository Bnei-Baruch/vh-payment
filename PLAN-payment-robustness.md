# Membership Payment Flow - Robustness Fixes

## Context
The MembershipPayment flow has critical bugs (fake success on backend failure, infinite loader, silent errors) and missing observability (no Sentry). This plan fixes these without architectural changes.

---

## 1. Install & Initialize Sentry

**Files:** `package.json`, `src/index.js`, `public/config/config.js`, `public/config/config-dev.js`

- `npm install @sentry/react@^7` (React 17 compatible)
- Add `SENTRY_DSN` and `SENTRY_ENVIRONMENT` to `window.APP_CONFIG` in both config files (empty strings — to be filled per environment)
- Initialize Sentry in `src/index.js` before `ReactDOM.render`:
  - Read DSN from `window.APP_CONFIG.SENTRY_DSN`
  - Only init if DSN is non-empty (so dev environments without DSN don't break)
  - Set `environment` from `window.APP_CONFIG.SENTRY_ENVIRONMENT`
- Wrap `<App />` with `Sentry.ErrorBoundary` for unhandled React errors

## 2. Set Sentry User Context on Login

**File:** `src/components/Auth/index.js`

- After successful Keycloak auth (in the `login()` function, after `loadUserProfile()`), call:
  ```js
  Sentry.setUser({
    id: keycloak.subject,
    email: keycloak.profile.email,
    username: keycloak.profile.username,
  });
  ```
- This ensures all subsequent Sentry events include user identity

## 3. Add Sentry to Error Handler

**File:** `src/services/errorHandler.js`

- Import `* as Sentry`
- In `enhanceError()`, call `Sentry.captureException(error)` with extra context (`errorType`, `statusCode`) for all errors **except** 401/403 (auth errors handled by Keycloak)

## 4. Fix `React.useState` used as `useEffect`

**File:** `src/pages/Order/Membership/MembershipPayment.js:199`

- Change `React.useState(() => {` to `React.useEffect(() => {`

## 5. Show Error on Payment Initiation Failure

**File:** `src/pages/Order/Membership/MembershipPayment.js`

- Add `const [error, setError] = React.useState(null)` state
- In `handlePay()` catch: set `setError(t("order.payment_initiation_failed"))` instead of just `console.error`
- Clear error at start of `handlePay()`: `setError(null)`
- Render an inline error notification (red background with `ErrorOutlineIcon`, matching the `NotificationContainer` pattern from `UpdatePayment.js`) below the confirm button when `error` is set

## 6. Fix Success Page — Full Rewrite of SuccessMembership.js

**File:** `src/pages/Success/SuccessMembership.js`

Three problems fixed at once:

**6a. Handle backend confirmation failure (don't show fake success)**
- Add `confirmationFailed` state
- In `paymentSuccess(q).catch()`: set `confirmationFailed = true`, capture to Sentry with `tags: { flow: 'membership_payment_confirmation' }`
- When `confirmationFailed`: show warning icon + message "Payment was processed but we couldn't confirm it. Please contact support at help@kli.one" with a Retry button

**6b. Fix infinite loader when not authenticated or no query params**
- Add a 10-second timeout: if user still not authenticated or query params empty after 10s, `setLoading(false)` and show an error message
- Handle empty query params explicitly — show error state

**6c. Processing interstitial**
- While `paymentSuccess()` is in-flight: show contextual "Confirming your payment..." message with `CircularProgress` spinner (not the generic full-page `<Loader />`)
- On success: transition to green checkmark
- On failure: transition to the failure state from 6a

**6d. Retry with backoff**
- Add `retryWithBackoff` utility in `src/services/orderservice.js`
- Catches errors, checks `error.isRetryable` (from existing `errorHandler.js`)
- Retries with exponential backoff (1s, 2s, 4s), max 3 retries
- Wrap `paymentSuccess()` call with this retry

## 7. Add Translation Keys (all 4 languages)

**Files:** `src/locales/{en,ru,es,he}/translation.json`

New keys to add under `"order"`:

| Key | EN | RU | ES | HE |
|-----|----|----|----|----|
| `payment_initiation_failed` | Unable to start payment. Please try again. | Не удалось начать оплату. Пожалуйста, попробуйте еще раз. | No se pudo iniciar el pago. Por favor, inténtalo de nuevo. | לא ניתן להתחיל את התשלום. אנא נסה שוב. |
| `confirming_payment` | Confirming your payment... | Подтверждение платежа... | Confirmando tu pago... | מאשר את התשלום שלך... |
| `confirmation_failed` | Your payment was processed but we couldn't confirm it. Please contact support at help@kli.one or try again. | Ваш платеж был обработан, но мы не смогли его подтвердить. Пожалуйста, свяжитесь с поддержкой help@kli.one или попробуйте снова. | Tu pago fue procesado pero no pudimos confirmarlo. Por favor contacta soporte en help@kli.one o inténtalo de nuevo. | התשלום בוצע אך לא הצלחנו לאשר אותו. אנא פנה לתמיכה ב-help@kli.one או נסה שוב. |
| `confirmation_failed_title` | Confirmation Issue | Проблема с подтверждением | Problema de confirmación | בעיה באישור |
| `session_expired` | Your session has expired. Please return to membership and try again. | Ваша сессия истекла. Пожалуйста, вернитесь к подписке и попробуйте снова. | Tu sesión ha expirado. Por favor, vuelve a membresía e inténtalo de nuevo. | פג תוקף ההתחברות. אנא חזור למנוי ונסה שוב. |

---

## Files to Modify (summary)

| File | Changes |
|------|---------|
| `package.json` | Add `@sentry/react` |
| `public/config/config.js` | Add `SENTRY_DSN`, `SENTRY_ENVIRONMENT` |
| `public/config/config-dev.js` | Add `SENTRY_DSN`, `SENTRY_ENVIRONMENT` |
| `src/index.js` | Sentry init + ErrorBoundary |
| `src/components/Auth/index.js` | Sentry.setUser after login |
| `src/services/errorHandler.js` | Sentry.captureException on errors |
| `src/services/orderservice.js` | Add `retryWithBackoff` utility |
| `src/pages/Order/Membership/MembershipPayment.js` | Fix useState→useEffect bug, add error display |
| `src/pages/Success/SuccessMembership.js` | Failure state, timeout fix, processing interstitial, retry |
| `src/locales/en/translation.json` | New translation keys |
| `src/locales/ru/translation.json` | New translation keys |
| `src/locales/es/translation.json` | New translation keys |
| `src/locales/he/translation.json` | New translation keys |

## Verification

1. **Sentry**: Trigger an API error — verify event appears in Sentry with user info
2. **useState fix**: Refresh MembershipPayment page — should initialize correctly without 3s delay
3. **Payment initiation error**: Block `/pay/v2/transaction` in DevTools — verify red error notification appears
4. **Success page failure**: Block `/pay/orders/paid` — verify warning UI with retry button (not green checkmark)
5. **Success page timeout**: Visit `/pay/success/membership` without query params — doesn't spin forever
6. **Retry**: Throttle network, trigger success — verify retries before showing failure
7. **Translations**: Switch language to each of en/ru/es/he — verify new messages render correctly
