import React, { useEffect, useState } from "react";

const CurrencyConverter = () => {
  const [amount, setAmount] = useState(1);
  const [fromCur, setFromCur] = useState("EUR");
  const [toCur, setToCur] = useState("USD");
  const [converted, setConverted] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function CurrencyConverter() {
      if (fromCur === toCur) {
        setConverted(amount); // If both currencies are the same, set the amount directly
        return;
      }

      setIsLoading(true);

      try {
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCur}&to=${toCur}`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch currency conversion data");
        }

        const data = await res.json();
        console.log(data);

        setConverted(data.rates[toCur] || "Error");
      } catch (error) {
        console.error(error);
        setConverted("Error fetching data");
      } finally {
        setIsLoading(false);
      }
    }

    CurrencyConverter();
  }, [amount, fromCur, toCur]); // Runs when amount, fromCur, or toCur changes

  return (
    <div>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        disabled={isLoading}
      />
      <select
        value={fromCur}
        onChange={(e) => setFromCur(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select
        value={toCur}
        onChange={(e) => setToCur(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>
        {isLoading ? "Loading..." : `${converted} ${toCur}`}
      </p>
    </div>
  );
};

export default CurrencyConverter;
