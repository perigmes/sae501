export const filterAvailableObjects = (objects) => (reservations) => (startDate) => (startTime) => (endDate) => (endTime) => {
    // Si une ou les deux dates sont vides, on retourne tous les objets
    if (!startDate || !endDate) {
      return objects; // Pas de filtre à appliquer
    }
  
    // Utiliser les horaires par défaut si les champs sont vides
    const startDateTime = new Date(`${startDate}T${startTime || "00:00"}`);
    const endDateTime = new Date(`${endDate}T${endTime || "23:59"}`);
  
    return objects.filter((object) => {
      // Trouver les réservations associées à l'objet
      const objectReservations = reservations.filter((reservation) =>
        reservation.objects.includes(object.id)
      );
  
      // Vérifier si l'objet n'a pas de chevauchement
      const hasOverlap = objectReservations.some((reservation) => {
        const reservationStart = new Date(`${reservation.startDT.date}T${reservation.startDT.time}`);
        const reservationEnd = new Date(`${reservation.returnDT.date}T${reservation.returnDT.time}`);
        return (
          reservationStart < endDateTime && // La réservation commence avant la fin de la plage
          reservationEnd > startDateTime   // La réservation se termine après le début de la plage
        );
      });
  
      return !hasOverlap; // Garder les objets sans chevauchement
    });
  };

  export const formatDateToFrench = (dateString) => {
    const date = new Date(dateString);
    const formatter = new Intl.DateTimeFormat("fr-FR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
    return formatter.format(date);
  };