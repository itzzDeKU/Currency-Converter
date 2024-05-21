import "./App.css";
import { useEffect, useState } from "react";
import CurrencyDiv from "./CurrencyDiv";

function App() {
  const [data, setData] = useState({});
  const [active, setActive] = useState(true);
  const [rate, setRate] = useState(1);
  const [curr1, setCurr1] = useState("INR");
  const [curr2, setCurr2] = useState("INR");
  const [amount1, setAmount1] = useState(0);
  const [amount2, setAmount2] = useState(0);

  async function fetchExchangeRate() {
    if (Object.keys(data).length === 0) {
      const url = `https://api.exchangerate-api.com/v4/latest/INR`;
      const response = await fetch(url);
      const temp = await response.json();
      setData(temp.rates);
    }
  }

  useEffect(() => {
    fetchExchangeRate();
  }, []);

  useEffect(() => {
    if (data[curr1] && data[curr2]) {
      const newRate = data[curr2] / data[curr1];
      setRate(newRate);

      if (active) {
        const convertedAmount2 = amount1 * newRate;
        setAmount2(convertedAmount2);
      } else {
        const convertedAmount1 = amount2 / newRate;
        setAmount1(convertedAmount1);
      }
    }
  }, [data, curr1, curr2, amount1, amount2, active]);

  const handleCurrChange = (event, isActive) => {
    const newCurrency = event.target.value;
    if (isActive) {
      setCurr1(newCurrency);
    } else {
      setCurr2(newCurrency);
    }
  };

  return (
    <div className="mt-16">
      <div className="">
        <h2 className="textCenter inactive-header">Currency Converter</h2>
        <CurrencyDiv
          active={true}
          className={`${
            active ? "active-div" : "inactive-div"
          } textCenter div-class`}
          setActive={setActive}
          setCurr={handleCurrChange}
          amount={amount1}
          setAmount={setAmount1}
        />
        <CurrencyDiv
          active={false}
          className={`${
            active ? "inactive-div" : "active-div"
          } textCenter div-class `}
          setActive={setActive}
          setCurr={handleCurrChange}
          amount={amount2}
          setAmount={setAmount2}
        />
      </div>
    </div>
  );
}

export default App;
