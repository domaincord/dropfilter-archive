import React, { useEffect, useState } from "react";
import moment from 'moment'
import { range } from 'lodash'

const DDDaySelector = () => {
    const [days, setDays] = useState(range(1, 31))
    const [day, setDay] = useState("01")

    const getDaysList = (month, year) => {
        const daysList = []
        const daysInMonth = moment(`${year}-${month}`, "YYYY-M").daysInMonth()
        for (let i = 1; i <= daysInMonth; i++) {
            daysList.push(i)
        }
        setDays(daysList)
    }

  const handleChange = (e) => {
    const { value, name } = e.target;
    const url = new URL(window.location.href);
    url.searchParams.set(name, value);
    window.location.href = url.toString();
  };

  useEffect(() => {
    const url = new URL(window.location.href);
    const yValue = url.searchParams.get('y')
    const mValue = url.searchParams.get('m')
    if (yValue && mValue) {
        getDaysList(mValue, yValue)
    }
    
    const dValue = url.searchParams.get('d')
    if (dValue) {
      setDay(dValue)
    }
  }, [])

  return (
    <>
      <select name="d" onChange={handleChange} placeholder="Drop Date - Day" value={day}>
        {days
          .map((d, index) => (
            <option key={`${index}-${d}`} value={moment(d, 'D').format("DD")}>
              {d}
            </option>
          ))}
      </select>
    </>
  );
};

export default DDDaySelector;
