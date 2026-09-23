function SummaryCards({ expenses }) {
  const totalSpent = expenses.reduce(
    (total, expense) =>
      total + Number(expense.amount),
    0
  );

  const transactionCount = expenses.length;

  const averageExpense =
    transactionCount > 0
      ? totalSpent / transactionCount
      : 0;

  return (
    <div className="summary-grid">

      <div className="summary-card">
        <div className="card-icon blue">
          💰
        </div>

        <div>
          <p>Total Spent</p>

          <h2>
            ₹{totalSpent.toFixed(2)}
          </h2>

          <span className="card-label">
            All expenses
          </span>
        </div>
      </div>

      <div className="summary-card">
        <div className="card-icon purple">
          🧾
        </div>

        <div>
          <p>Transactions</p>

          <h2>{transactionCount}</h2>

          <span className="card-label">
            Total transactions
          </span>
        </div>
      </div>

      <div className="summary-card">
        <div className="card-icon green">
          📊
        </div>

        <div>
          <p>Average Expense</p>

          <h2>
            ₹{averageExpense.toFixed(2)}
          </h2>

          <span className="card-label">
            Per transaction
          </span>
        </div>
      </div>

    </div>
  );
}

export default SummaryCards;