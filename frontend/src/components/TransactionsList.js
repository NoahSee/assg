import React from "react";

const TransactionsList = ({
  transactions,
  page,
  pageSize,
  onPageChange,
  onPageSizeChange,
}) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Hash</th>
            <th>Timestamp</th>
            <th>Fee (USDT)</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((txn) => (
            <tr key={txn.transaction_id}>
              <td>{txn.hash}</td>
              <td>{txn.timestamp}</td>
              <td>{txn.fee_usdt.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={() => onPageChange(page - 1)} disabled={page === 1}>
          Previous
        </button>
        <span>Page {page}</span>
        <button onClick={() => onPageChange(page + 1)}>Next</button>
        <select
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </div>
    </div>
  );
};

export default TransactionsList;
