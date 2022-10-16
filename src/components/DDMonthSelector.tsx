import React, { useEffect, useState } from "react";
import moment from 'moment'

const defaultMonths = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

const DDMonthSelector = () => {
  const [months, setMonths] = useState(defaultMonths)
  const [month, setMonth] = useState("1")

  const getMonthsList = (year, mValue) => {
    const monthsList = []
    for (let i = 1; i <= 12; i++) {
      const monthName = moment(i, 'M').format("MMMM")
      if (year === "2020" && i < 11) {
        monthsList.push(null)
      } else {
        monthsList.push(monthName)
      }
    }
    const filteredMonthsList = monthsList.filter(Boolean)
    setMonths(filteredMonthsList)

    if (!filteredMonthsList.includes(moment(mValue, 'M').format("MMMM"))) {
      const url = new URL(window.location.href);
      const newMValue = moment(filteredMonthsList[0], 'MMMM').format("M")
      url.searchParams.set('m', newMValue);
      url.searchParams.set('y', year)
      return window.location.href = url.toString();
    }
    
    setMonth(moment(filteredMonthsList[0], 'MMMM').format("M"))
  }

  const handleChange = (e) => {
    const { value, name } = e.target;
    const url = new URL(window.location.href);
    url.searchParams.set(name, value);
    window.location.href = url.toString();
  };

  useEffect(() => {
    const url = new URL(window.location.href);
    const mValue = url.searchParams.get('m')
    const yValue = url.searchParams.get('y')

    if (yValue && mValue) {
      getMonthsList(yValue, mValue)
      return
    }

    if (mValue) {
      setMonth(mValue)
    }
  }, [])

  return (
    <>
      <select name="m" onChange={handleChange} placeholder="Drop Date - Month" value={month} className="mr-1">
        { months.length ? months
          .map((mon, index) => (
            <option key={`${index}-${mon.toLowerCase()}`} value={moment(mon, 'MMMM').format("M")}>
              {mon}
            </option>
          )) : null }
      </select>
    </>
  );
};

export default DDMonthSelector;
