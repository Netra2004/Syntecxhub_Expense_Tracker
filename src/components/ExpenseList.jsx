function ExpenseList({
  expenses,
  onDelete
}) {
  if (expenses.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">
          🧾
        </div>

        <h3>No expenses found</h3>

        <p>
          Start adding your expenses to see
          them here.
        </p>
      </div>
    );
  }

  return (
    <div className="expense-list">
      {expenses.map((expense) => (
        <div
          className="expense-row"
          key={expense.id}
        >
          <div className="expense-left">
            <div className="expense-category-icon">
              {expense.category === "Food"
                ? "🍔"
                : expense.category ===
                  "Utilities"
                ? "💡"
                : expense.category ===
                  "Entertainment"
                ? "🎬"
                : expense.category ===
                  "Shopping"
                ? "🛍️"
                : expense.category ===
                  "Travel"
                ? "✈️"
                : "📦"}
            </div>

            <div>
              <h3>{expense.title}</h3>

              <p>
                {expense.category} •{" "}
                {new Date(
                  expense.date
                ).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="expense-right">
            <strong>
              ₹{Number(expense.amount).toFixed(2)}
            </strong>

            <button
              className="delete-button"
              onClick={() =>
                onDelete(expense.id)
              }
            >
              🗑️
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ExpenseList;