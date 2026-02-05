const formatTimeAgo = (
  value: number,
  singular: string,
  plural: string,
): string => {
  return `hace ${value} ${value === 1 ? singular : plural}`;
};

export const formatDate = (dateString: string): string => {
  const now = new Date();
  const date = new Date(dateString);
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return "ahora";
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return formatTimeAgo(diffInMinutes, "minuto", "minutos");
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return formatTimeAgo(diffInHours, "hora", "horas");
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return formatTimeAgo(diffInDays, "día", "días");
  }

  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) {
    return formatTimeAgo(diffInWeeks, "semana", "semanas");
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return formatTimeAgo(diffInMonths, "mes", "meses");
  }

  const diffInYears = Math.floor(diffInDays / 365);
  return formatTimeAgo(diffInYears, "año", "años");
};
