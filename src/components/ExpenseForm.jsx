import { useState, useRef } from "react";

function ExpenseForm({ onAddExpense }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  const titleInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !title.trim() ||
      !amount ||
      Number(amount) <= 0 ||
      !category
    ) {
      return;
    }

    const newExpense = {
      id: Date.now(),
      title: title.trim(),
      amount: Number(amount),
      category,
      date: new Date().toISOString(),
    };

    onAddExpense(newExpense);

    setTitle("");
    setAmount("");
    setCategory("");

    titleInputRef.current?.focus();
  };

  return (
    <form
      className="expense-form"
      onSubmit={handleSubmit}
    >
      <div className="form-group">
        <label>Expense Title</label>

        <input
          ref={titleInputRef}
          type="text"
          placeholder="e.g. Grocery shopping"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
        />
      </div>

      <div className="form-group">
        <label>Amount</label>

        <input
          type="number"
          placeholder="0.00"
          min="0"
          step="0.01"
          value={amount}
          onChange={(e) =>
            setAmount(e.target.value)
          }
        />
      </div>

      <div className="form-group">
        <label>Category</label>

        <select
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
          required
        >
          <option value="" disabled>
            Select Category
          </option>

          <option value="Food">
            🍔 Food
          </option>

          <option value="Utilities">
            💡 Utilities
          </option>

          <option value="Entertainment">
            🎬 Entertainment
          </option>

          <option value="Shopping">
            🛍️ Shopping
          </option>

          <option value="Travel">
            ✈️ Travel
          </option>

          <option value="Other">
            📦 Other
          </option>
        </select>
      </div>

      <button
        type="submit"
        className="add-expense-button"
      >
        + Add Expense
      </button>
    </form>
  );
}

export default ExpenseForm;