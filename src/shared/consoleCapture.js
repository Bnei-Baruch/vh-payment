// Passive capture of console.error for the "Something went wrong" report.
// Keeps the last few entries with timestamps so a copied report shows what
// happened and when, relative to the copy click. Never alters console output
// and never triggers any UI by itself.
const MAX_ENTRIES = 10;
const MAX_MESSAGE_LEN = 500;
const entries = [];

const serialize = (arg) => {
  if (typeof arg === "string") return arg;
  if (arg instanceof Error) return arg.stack || arg.message;
  try {
    return JSON.stringify(arg);
  } catch (e) {
    return String(arg);
  }
};

const original = console.error;
console.error = (...args) => {
  entries.push({
    time: new Date().toISOString(),
    message: args.map(serialize).join(" ").slice(0, MAX_MESSAGE_LEN),
  });
  if (entries.length > MAX_ENTRIES) entries.shift();
  original.apply(console, args);
};

export const getRecentConsoleErrors = () => [...entries];
