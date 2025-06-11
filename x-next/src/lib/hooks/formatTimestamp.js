export function formatFirestoreTimestamp(ts, locale = "en-US", options = {}) {
    if (!ts?.seconds) return "";
  
    const date = new Date(ts.seconds * 1000);
  
    return date.toLocaleDateString(locale, {
      month: "long",
      day: "numeric",
      ...options,
    });
  }
  