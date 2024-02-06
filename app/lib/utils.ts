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

export const extractTimeAndTranslate = (text: string) => {
  // Regular expression to match time in Persian format
  const timeRegex = /([۰-۹]+:[۰-۹]+)/g;

  // Executing the regular expression on the text
  const matches = text.match(timeRegex);

  if (matches) {
    const translatedTimes = matches.map((time) => {
      // Translate Persian digits to English digits
      const translatedTime = time.replace(/[۰-۹]/g, (d) =>
        String.fromCharCode(
          d.charCodeAt(0) - "۰".charCodeAt(0) + "0".charCodeAt(0)
        )
      );

      // Split hours and minutes
      const [hour, minute] = translatedTime.split(":");

      // Ensure hour and minute have two digits
      const formattedTime = [
        hour.padStart(2, "0"),
        minute.padStart(2, "0"),
      ].join(":");

      return formattedTime;
    });

    return translatedTimes;
  }

  // If no matches found, return null
  return null;
};
