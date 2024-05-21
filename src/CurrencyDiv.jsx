import React from "react";

const CurrencyDiv = ({
  className = "",
  setRate,
  active,
  setActive,
  amount,
  setAmount,
  setCurr,
}) => {
  return (
    <div className={className} onClick={() => setActive(active)}>
      <div>
        <input
          type="number"
          value={amount}
          onChange={(e) => {
            setAmount(e.target.value);
          }}
        />
      </div>
      <div>
        <select onChange={(event) => setCurr(event, active)}>
          <option value="INR">Indian National Ruppee</option>
          <option value="USD">US Dollar</option>
          <option value="JPY">Japanese Yen </option>
          <option value="KRW">Korean Won</option>
          <option value="CNY">Chinese Yuan</option>
        </select>
      </div>
    </div>
  );
};

export default CurrencyDiv;
