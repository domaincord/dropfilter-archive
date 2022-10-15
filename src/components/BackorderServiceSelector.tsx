import React, { useEffect, useState } from "react";
import { defaultBackorderServices } from "../constants";

const BackorderServiceSelector = () => {
  const [backorderService, setBackorderService] = useState(defaultBackorderServices[0].slug)

  const handleChange = (e) => {
    const { value, name } = e.target;
    const url = new URL(window.location.href);
    url.searchParams.set(name, value);
    window.location.href = url.toString();
  };

  useEffect(() => {
    const url = new URL(window.location.href);
    const bsValue = url.searchParams.get('bs')
    if (bsValue) {
      setBackorderService(bsValue)
    }
  }, [])

  return (
    <>
      <select name="bs" onChange={handleChange} placeholder="Select Backorder Service" value={backorderService} className="mr-1">
        {defaultBackorderServices
          .filter((service) => service.active)
          .map((service, index) => (
            <option key={`${index}-${service.slug}`} value={service.slug}>
              {service.displayName}
            </option>
          ))}
      </select>
    </>
  );
};

export default BackorderServiceSelector;
