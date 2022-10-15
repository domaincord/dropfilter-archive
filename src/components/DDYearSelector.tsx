import React, { useEffect, useState } from "react";
import moment from 'moment'

const years = [
    "2020",
    "2021",
    "2022",
];

const DDYearSelector = () => {
  const [years, setYears] = useState([])
  const [year, setYear] = useState(years[years.length - 1])

  const handleChange = (e) => {
    const { value, name } = e.target;
    const url = new URL(window.location.href);
    url.searchParams.set(name, value);
    window.location.href = url.toString();
  };

  const getYearsList = () => {
    const currentYear = moment().year()
    const yearsList = []
    for (let i = 2020; i <= currentYear; i++) {
      yearsList.push(i)
    }
    setYears(yearsList)
  }


  useEffect(() => {
    getYearsList()
    const url = new URL(window.location.href);
    const yValue = url.searchParams.get('y')
    if (yValue) {
      setYear(parseInt(yValue))
    }
  }, [])

  return (
    <>
      <select name="y" onChange={handleChange} placeholder="Drop Date - Year" value={year} className="mr-1">
        {years
          .map((y, index) => (
            <option key={`${index}-${y}`} value={y}>
              {y}
            </option>
          ))}
      </select>
    </>
  );
};

export default DDYearSelector;
