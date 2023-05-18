import React, { useState, useEffect, useRef } from "react";
import "../App.css";
import iconArrow from "../assets/images/icon-arrow.svg";
import { isValidDate } from "./dateUtility.js";

function DateInput({ onDateChange }) {
  const timeoutID = useRef(null);
  const [dayInput, setDayInput] = useState("-");
  const [monthInput, setMonthInput] = useState("-");
  const [yearInput, setYearInput] = useState("-");

  const [dayError, setDayError] = useState(false);
  const [monthError, setMonthError] = useState(false);
  const [yearError, setYearError] = useState(false);
  const [dateError, setDateError] = useState(false);

  useEffect(() => {
    clearTimeout(timeoutID.current); // timer for finalizing date input
    timeoutID.current = setTimeout(() => {
      console.log("DateInput: " + dayInput);
      const errors = isValidDate(dayInput, monthInput, yearInput);
      const isValid = errors.length === 0 ? true : false;
      if (isValid) {
        const newDateString = monthInput + "/" + dayInput + "/" + yearInput;
        onDateChange(newDateString);
      } else {
        onDateChange(null);
      }
      setDayError(errors.includes("day") ? true : false);
      setMonthError(errors.includes("month") ? true : false);
      setYearError(errors.includes("year") ? true : false);
      setDateError(errors.includes("date") ? true : false);
    }, 200);
  }, [dayInput, monthInput, yearInput, onDateChange]);

  const handleDayInputChange = (value) => {
    setDayInput(value);
  };

  const handleMonthInputChange = (value) => {
    setMonthInput(value);
  };

  const handleYearInputChange = (value) => {
    setYearInput(value);
  };

  return (
    <>
      <div className="inputs">
        <div className="inputContainer">
          <div
            className={
              dayError || dateError ? "inputTitle error" : "inputTitle"
            }
          >
            DAY
          </div>
          <TextField
            id="day"
            onInputChange={handleDayInputChange}
            placeholder="DD"
            error={dayError || dateError}
          />
          {dayError && <div className="errorText">Must be a valid day</div>}
          {dateError && !dayError && (
            <div className="errorText">Must be a valid date</div>
          )}
        </div>

        <div className="inputContainer">
          <div
            className={
              monthError || dateError ? "inputTitle error" : "inputTitle"
            }
          >
            MONTH
          </div>
          <TextField
            id="month"
            onInputChange={handleMonthInputChange}
            placeholder="MM"
            error={monthError || dateError}
          />
          {monthError && <div className="errorText">Must be a valid month</div>}
        </div>

        <div className="inputContainer">
          <div
            className={
              yearError || dateError ? "inputTitle error" : "inputTitle"
            }
          >
            YEAR
          </div>
          <TextField
            id="year"
            onInputChange={handleYearInputChange}
            placeholder="YYYY"
            error={yearError || dateError}
          />
          {yearError && <div className="errorText">Must be in the past</div>}
        </div>
      </div>
      {!dayError && !dateError && !monthError && !yearError && (
        <div className="errorGap" />
      )}
    </>
  );
}

function TextField({ onInputChange, placeholder, error }) {
  const [text, setText] = useState("");

  const handleInputChange = (event) => {
    setText(event.target.value);
    onInputChange(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        defaultValue={text}
        onChange={handleInputChange}
        placeholder={placeholder}
        className={error ? "inputError" : ""}
      />
    </div>
  );
}

function TimeOutput({ dateString }) {
  let [years, setYears] = useState("--");
  let [months, setMonths] = useState("--");
  let [days, setDays] = useState("--");

  useEffect(() => {
    if (years === "--") years = "1985";
    if (months === "--") months = "10";
    if (days === "--") days = "26";
    if (dateString != null) {
      // Define the specific date you want to calculate the difference from
      const specificDate = new Date(dateString);

      // Get today's date
      const today = new Date();

      // Calculate the difference in milliseconds between the two dates
      const differenceInMilliseconds = today.getTime() - specificDate.getTime();

      // Convert milliseconds to years
      const _years = Math.floor(
        differenceInMilliseconds / (1000 * 60 * 60 * 24 * 365)
      );

      // Remove the years from the difference and convert the remainder to months
      const _months = Math.floor(
        (differenceInMilliseconds % (1000 * 60 * 60 * 24 * 365)) /
          (1000 * 60 * 60 * 24 * 30)
      );

      // Remove the years and months from the difference and convert the remainder to days
      const _days = Math.floor(
        (differenceInMilliseconds % (1000 * 60 * 60 * 24 * 30)) /
          (1000 * 60 * 60 * 24)
      );

      const yearDiff = _years - parseInt(years);
      const monthDiff = _months - parseInt(months);
      const dayDiff = _days - parseInt(days);
      let counter = 0;
      const duration = 1500; // duration of animation in ms

      const interval = setInterval(() => {
        counter += 10; // increment counter by 10ms

        if (counter >= duration) {
          // if animation duration is over, update the state with new values
          setYears(_years.toString());
          setMonths(_months.toString());
          setDays(_days.toString());
          clearInterval(interval); // clear the interval
        } else {
          // update the state with interpolated values based on the counter and difference
          setYears(
            (parseInt(years) + (yearDiff * counter) / duration).toFixed(0)
          );
          setMonths(
            (parseInt(months) + (monthDiff * counter) / duration).toFixed(0)
          );
          setDays((parseInt(days) + (dayDiff * counter) / duration).toFixed(0));
        }
      }, 2); // repeat every 2ms
    } else {
      setYears("--");
      setMonths("--");
      setDays("--");
    }
  }, [dateString]);

  return (
    <>
      <div className="timeOutputContainer">
        <div className="resultTime">{years} </div>
        <div className="resultTime resultLabel">
          {years === "1" ? "year" : "years"}
        </div>
      </div>
      <div className="timeOutputContainer">
        <div className="resultTime">{months} </div>
        <div className="resultTime resultLabel">
          {months === "1" ? "month" : "months"}
        </div>
      </div>
      <div className="timeOutputContainer">
        <div className="resultTime">{days} </div>
        <div className="resultTime resultLabel">
          {days === "1" ? "day" : "days"}
        </div>
      </div>
    </>
  );
}

function CalButton({ onClick }) {
  return (
    <>
      <div className="cal-button" onClick={onClick}>
        <img className="image" src={iconArrow} alt="icon-arrow" />
      </div>
    </>
  );
}

export default function AgeInput() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [outputDate, setOutputDate] = useState(null);

  function handleDateChange(newDateString) {
    setSelectedDate(newDateString);
  }

  function handleClick() {
    setOutputDate(selectedDate);
  }

  return (
    <>
      <DateInput onDateChange={handleDateChange} />
      <div className="graphicContainer">
        <div className="line-wrapper">
          <div className="gray-line"></div>
        </div>
        <CalButton onClick={handleClick} />
      </div>
      <div className="ageInput"></div>
      <TimeOutput dateString={outputDate} />
    </>
  );
}
