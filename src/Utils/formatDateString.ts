import { format } from 'date-fns';
import brazillianLocale from 'date-fns/locale/pt-BR';

export const formatDateString = (isoDateString: string): string => {
  const date = new Date(isoDateString);
  const formattedDateString = format(date, 'dd MMM yyyy', {locale: brazillianLocale});
  return formattedDateString;
}
