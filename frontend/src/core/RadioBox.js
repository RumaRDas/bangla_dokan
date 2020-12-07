import React, { useState, useEffect, Fragment } from "react";

const RadioBox = ({ prices }) => {
  const [values, setValues] = useState(0);

  const handleChange = () => {};

  return prices.map((p, i) => {
    // JSON.stringify(prices);
    return (
      <div key={i}>
        <input
          onChange={handleChange}
          value={`${p._id}`}
          type="radio"
          className="mr-2 mr-4"
        />
        <label className="form-check-label">{p.name}</label>
      </div>
    );
  });
};

export default RadioBox;
