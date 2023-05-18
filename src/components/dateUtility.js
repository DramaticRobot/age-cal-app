let didInit_month = false;
let didInit_day = false;
let didInit_year = false;

export function isValidDate(dayInput, monthInput, yearInput) {
  const errors = [];
  // Parse the date components from the string
  const day = parseInt(dayInput);
  const month = parseInt(monthInput);
  const year = parseInt(yearInput);

  // Check if the month is valid
  if (!didInit_month && monthInput != "-") {
    didInit_month = true;
  }
  if (didInit_month) {
    if (isNaN(Number(monthInput)) || monthInput === "") {
      errors.push("month");
    }
    else if (month < 1 || month > 12 || isNaN(month)) {
      if (!isNaN(month))
        errors.push("month");
    }
  }

  // Check if the day is valid
  if (!didInit_day && dayInput != "-") {
    didInit_day = true;
  }
  if (didInit_day) {
    if (isNaN(Number(dayInput)) || dayInput === "") {
      errors.push("day");
    }
    else if (day < 1 || day > 31 || isNaN(day)) {
      if (!isNaN(day))
        errors.push("day");
    }
    const daysInMonth = new Date(year, month, 0).getDate();
    if (day < 1 || day > daysInMonth) {
      errors.push("date");
    }
  }

  // Check if the year is valid
  const currentDate = new Date();
  if (!didInit_year && yearInput != "-") {
    didInit_year = true;
  }
  if (didInit_year) {
    if (isNaN(Number(yearInput)) || yearInput === "") {
      errors.push("year");
    } else if (year > currentDate.getFullYear() || isNaN(year)) {
      if (!isNaN(year)) {
        errors.push("year");
      }
    }

    // Check if the date is greater than today's date
    if (didInit_month && didInit_day) {
      if (errors.length === 0) {
        let inputYear = year;
        if (year < 100) {
          errors.push("date");
        }

        const inputDate = new Date(inputYear, month - 1, day); // month - 1 since months are zero-indexed in JavaScript
        if (inputDate > currentDate) {
          console.log("didInit_month: " + didInit_month);
          console.log("didInit_day: " + didInit_day);
          errors.push("date");
        }
      }
    }
  }

  // If all checks pass, the date is valid
  return errors;
}