import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale/es';

export default function useDateParser() {
  const parseDate = (date: any) => {
    const newDate = new Date(date);
    const isoString = newDate.toISOString(); // Convert to ISO 8601 format
    const formattedDate = format(parseISO(isoString), 'd MMMM, yyyy HH:mm', { locale: es });
    return formattedDate;
  };

  const parseDateTimeStampToISO = (date_TIMESTAMP: any) => {
    const newDate = date_TIMESTAMP.toDate();
    const formattedDate = format(newDate, 'd MMMM, yyyy HH:mm', { locale: es });
    return formattedDate;
  };


  return {
    parseDate,
    parseDateTimeStampToISO
  }
}