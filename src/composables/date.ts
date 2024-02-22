import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale/es";

export default function useDateParser() {
  const parseDate = (date: any) => {
    if (date != null) {
      const newDate = new Date(date);
      const isoString = newDate.toISOString(); // Convert to ISO 8601 format
      const formattedDate = format(parseISO(isoString), "d MMMM, yyyy HH:mm", {
        locale: es,
      });
      return formattedDate;
    }
    return "";
  };

  const parseDateTimeStampToISO = (date_TIMESTAMP: any) => {
    if (date_TIMESTAMP != null) {
      const newDate = date_TIMESTAMP.toDate();
      const formattedDate = format(newDate, "EEEE d MMMM, yyyy HH:mm", {
        locale: es,
      });
      return formattedDate;
    }
    return "";
  };

  const parseDateStampToISO = (date_TIMESTAMP: any) => {
    if (date_TIMESTAMP != null) {
      const newDate = date_TIMESTAMP.toDate();
      const formattedDate = format(newDate, "d MMMM, yyyy", { locale: es });
      return formattedDate;
    }
    return "";
  };

  const parseDateStampToISOHours = (date_TIMESTAMP: any) => {
    if (date_TIMESTAMP != null) {
      const newDate = date_TIMESTAMP.toDate();
      const formattedDate = format(newDate, "EEEE d MMMM, yyyy HH:mm", { locale: es });
      return formattedDate;
    }
    return "";
  };

  const parseDateTimeStampToISO_GetHours = (date_TIMESTAMP: any) => {
    const newDate = date_TIMESTAMP.toDate();
    const formattedDate = format(newDate, "HH:mm", { locale: es });
    return formattedDate;
  };

  const parseDateTimeStampToISO_GetDay = (date_TIMESTAMP: any) => {
    const newDate = date_TIMESTAMP.toDate();
    const formattedDate = format(newDate, "d MMMM, yyyy", { locale: es });
    return formattedDate;
  };

  return {
    parseDate,
    parseDateTimeStampToISO,
    parseDateTimeStampToISO_GetHours,
    parseDateTimeStampToISO_GetDay,
    parseDateStampToISO,
    parseDateStampToISOHours
  };
}
