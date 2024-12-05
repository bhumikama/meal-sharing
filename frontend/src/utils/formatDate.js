import { format } from "date-fns";
export const formatDate = (dateStr) => {
  const date = new Date(dateStr.replace(" ", "T"));

  const formattedDate = format(date, "eee, dd MMM, HH:mm");
  return formattedDate;
};
