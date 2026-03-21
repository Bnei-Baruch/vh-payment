FROM node:24 AS builder

ARG PUBLIC_URL=""
ARG REACT_APP_COMMIT_SHA="dynamic"

ENV PUBLIC_URL=${PUBLIC_URL}
ENV REACT_APP_COMMIT_SHA="${REACT_APP_COMMIT_SHA}"

WORKDIR /vh-payment
ADD . /vh-payment

RUN mkdir vh-payment && \
    chown -R node:node vh-payment && \
    yarn install && \
    npm run-script build --output-path=build && \
    curl -sL https://github.com/getsentry/sentry-cli/releases/latest/download/sentry-cli-Linux-x86_64 -o /usr/local/bin/sentry-cli && \
    chmod +x /usr/local/bin/sentry-cli && \
    sentry-cli sourcemaps inject build/

FROM nginx:1.25

COPY nginx/nginx-custom.conf /etc/nginx/conf.d/default.conf
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /vh-payment/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

