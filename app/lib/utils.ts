export const getNearestDayOfWeek = (targetDay: number) => {
  const today = new Date().getDay(); // Current day of the week (0 - 6, Sunday to Saturday)

  // Calculate the difference between the target day and today
  let difference = targetDay - today;

  // If the target day is before today, add 7 to get the positive difference
  if (difference < 0) {
    difference += 7;
  }

  // Calculate the date of the nearest day
  const nearestDate = new Date();
  nearestDate.setDate(nearestDate.getDate() + difference);

  return nearestDate;
};

export const scrollToPageBottom = () => {
  const pageBottomElement = document.getElementById("page-bottom");

  if (pageBottomElement) {
    pageBottomElement.scrollIntoView({ behavior: "smooth" });
  } else {
    console.error("Element with id 'page-bottom' not found.");
  }
};
