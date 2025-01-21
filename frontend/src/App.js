import React, { useState, useEffect } from "react";
import axios from "axios";
import QueryForm from "./components/QueryForm";
import TransactionsList from "./components/TransactionsList";
import Summary from "./components/Summary";

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const [totalFeeUSDT, setTotalFeeUSDT] = useState(0);
  const [totalFeeETH, setTotalFeeETH] = useState(0);
  const [ethUsdtPrice, setEthUsdtPrice] = useState(0);

  const fetchEthUsdtPrice = async () => {
    try {
      const response = await axios.get(
        "https://api.binance.com/api/v3/ticker/price?symbol=ETHUSDT"
      );
      setEthUsdtPrice(parseFloat(response.data.price));
    } catch (error) {
      console.error("Error fetching ETH/USDT price:", error);
    }
  };

  const fetchTransactions = async (query) => {
    try {
      const response = await axios.get(
        "http://localhost:3001/get-transactions",
        {
          params: {
            startTimestamp: new Date(query.startTime).getTime(),
            endTimestamp: new Date(query.endTime).getTime(),
            hash: query.txHash || null,
            offset: pageSize,
            page: page,
          },
        }
      );

      setTransactions(response.data);

      // Calculate total fees
      const totalUSDT = response.data.reduce(
        (acc, tx) => acc + parseFloat(tx.fee_usdt),
        0
      );
      const totalETH = response.data.reduce(
        (acc, tx) => acc + parseFloat(tx.close_price),
        0
      );
      setTotalFeeUSDT(totalUSDT);
      setTotalFeeETH(totalETH);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  useEffect(() => {
    fetchTransactions({});
    fetchEthUsdtPrice(); // Fetch ETH/USDT price when component mounts
  }, [page, pageSize]);

  return (
    <div>
      <h1>Uniswap Transactions</h1>
      <QueryForm onSubmit={fetchTransactions} />
      <Summary
        totalFeeUSDT={totalFeeUSDT}
        totalFeeETH={totalFeeETH}
        ethUsdtPrice={ethUsdtPrice}
      />
      <TransactionsList
        transactions={transactions}
        page={page}
        pageSize={pageSize}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
      />
    </div>
  );
};

export default App;
