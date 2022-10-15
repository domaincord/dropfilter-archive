import React, { useEffect, useState } from "react";
import moment from 'moment'

const months = [
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
];

const DDMonthSelector = () => {
  const [month, setMonth] = useState("1")

  const handleChange = (e) => {
    const { value, name } = e.target;
    const url = new URL(window.location.href);
    url.searchParams.set(name, value);
    window.location.href = url.toString();
  };

  useEffect(() => {
    const url = new URL(window.location.href);
    const mValue = url.searchParams.get('m')
    if (mValue) {
      setMonth(mValue)
    }
  }, [])

  return (
    <>
      <select name="m" onChange={handleChange} placeholder="Drop Date - Month" value={month} className="mr-1">
        {months
          .map((mon, index) => (
            <option key={`${index}-${mon.toLowerCase()}`} value={moment(mon, 'MMMM').format("M")}>
              {mon}
            </option>
          ))}
      </select>
    </>
  );
};

export default DDMonthSelector;
