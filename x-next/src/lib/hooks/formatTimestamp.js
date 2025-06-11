import { formatDistanceToNow, isToday, format } from "date-fns";

export function formatTimestamp(ts) {
  if (!ts?.seconds) return "";

  const date = new Date(ts.seconds * 1000);

  if (isToday(date)) {
    return formatDistanceToNow(date, { addSuffix: true }); // e.g. "3 hours ago"
  }

  return format(date, "MMMM d"); // e.g. "June 11"
}
