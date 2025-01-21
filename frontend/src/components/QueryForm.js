import React, { useState } from "react";

const QueryForm = ({ onSubmit }) => {
  const [txHash, setTxHash] = useState(null);
  const [startTime, setStartTime] = useState(1672531200000);
  const [endTime, setEndTime] = useState(1672534800000);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ txHash, startTime, endTime });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Transaction Hash:
        <input
          type="text"
          placeholder="Transaction Hash"
          value={txHash}
          onChange={(e) => setTxHash(e.target.value)}
        />
      </label>
      <label>
        Start Time:
        <input
          type="number"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
      </label>
      <label>
        End Time:
        <input
          type="number"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />
      </label>
      <button type="submit">Search</button>
    </form>
  );
};

export default QueryForm;
