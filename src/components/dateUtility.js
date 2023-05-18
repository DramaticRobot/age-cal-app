export function isValidDate(dayInput, monthInput, yearInput) {
  const errors = [];

  // Parse the date components from the string
  const day = parseInt(dayInput); 
  const month = parseInt(monthInput); 
  const year = parseInt(yearInput); 

  console.log("isValidDate: " + dayInput);

  // Check if the month is valid
  if (isNaN(Number(monthInput)) && monthInput != "-") {
    errors.push("month");
  }
  else if (month < 1 || month > 12 || isNaN(month)) {
    if (!isNaN(month))
      errors.push("month");
  }

  // Check if the day is valid
  if (isNaN(Number(dayInput)) && dayInput != "-") {
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

  // Check if the year is valid
  const currentDate = new Date();
  if (isNaN(Number(yearInput))&& yearInput != "-") {
    errors.push("year");
  }
  else if (year > currentDate.getFullYear() || isNaN(year)) {
    if (!isNaN(year))
      errors.push("year");
  }

  // Check if the date is greater than today's date
  if (errors.length === 0) {
    const inputDate = new Date(year, month - 1, day); // month - 1 since months are zero-indexed in JavaScript
    if (inputDate > currentDate) {
      errors.push("date");
    }
  }

  // If all checks pass, the date is valid
  return errors;
}