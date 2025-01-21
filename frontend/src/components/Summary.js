import React from "react";

const Summary = ({ totalFeeUSDT, totalFeeETH, ethUsdtPrice }) => {
  return (
    <div>
      <h3>Summary</h3>
      <p>Total Transaction Fee in USDT: {totalFeeUSDT.toFixed(2)}</p>
      <p>Total Transaction Fee in ETH: {totalFeeETH.toFixed(2)}</p>
      <p>Current ETH/USDT Price: {ethUsdtPrice.toFixed(2)}</p>
    </div>
  );
};

export default Summary;
