import dayjs from "dayjs";


  export const formatDateToFrench = (dateString) => {
    const date = new Date(dateString);
    const formatter = new Intl.DateTimeFormat("fr-FR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
    return formatter.format(date);
  };

  export const formatTimeNoSeconds = (timeString) => {
    return timeString.split(":").slice(0, 2).join(":");
  }

  export const formatDateToLocalISOString = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}`;
};

// Créer une date correspondant à aujourdh'hui minuit avec un nombre de jours supplémentaires

export const getDatePlusDays = (days) => {
  const today = dayjs().add(days, 'day').startOf('day');
  return dayjs(today).format('YYYY-MM-DDTHH:mm');
};

export const formatErrorMessage = (errors) => {
  if (errors.length === 1) {
      return errors[0].charAt(0).toUpperCase() + errors[0].slice(1) + ".";
  } else if (errors.length === 2) {
      return (
          errors[0].charAt(0).toUpperCase() +
          errors[0].slice(1) +
          " et " +
          errors[1] +
          "."
      );
  } else {
      const lastError = errors[errors.length - 1];
      const formattedErrors =
          errors
              .slice(0, -1)
              .map((error, i) =>
                  i === 0
                      ? error.charAt(0).toUpperCase() + error.slice(1)
                      : error
              )
              .join(", ") +
          " et " +
          lastError +
          ".";
      return formattedErrors;
  }
};
