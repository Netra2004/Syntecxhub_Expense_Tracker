import { useEffect, useMemo, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import "./App.css";

function App() {
  const [activePage, setActivePage] = useState("Dashboard");

  const [expenses, setExpenses] = useState(() => {
    const savedExpenses = localStorage.getItem(
      "expenseTrackerExpenses"
    );

    if (savedExpenses) {
      return JSON.parse(savedExpenses);
    }

    return [
      {
        id: 1,
        title: "Groceries",
        amount: 850,
        category: "Food",
        date: "2026-09-20",
      },
      {
        id: 2,
        title: "Internet Bill",
        amount: 799,
        category: "Utilities",
        date: "2026-09-18",
      },
      {
        id: 3,
        title: "Movie",
        amount: 450,
        category: "Entertainment",
        date: "2026-09-15",
      },
      {
        id: 4,
        title: "New Shoes",
        amount: 2200,
        category: "Shopping",
        date: "2026-09-12",
      },
      {
        id: 5,
        title: "Cab",
        amount: 320,
        category: "Travel",
        date: "2026-09-10",
      },
    ];
  });

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] =
    useState("All");

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    localStorage.setItem(
      "expenseTrackerExpenses",
      JSON.stringify(expenses)
    );
  }, [expenses]);

  const totalSpent = useMemo(() => {
    return expenses.reduce(
      (total, expense) =>
        total + Number(expense.amount),
      0
    );
  }, [expenses]);

  const averageExpense = useMemo(() => {
    if (expenses.length === 0) {
      return 0;
    }

    return totalSpent / expenses.length;
  }, [expenses, totalSpent]);

  const formatMoney = (value) => {
    return `₹${Number(value).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const getCategoryIcon = (categoryName) => {
    switch (categoryName) {
      case "Food":
        return "🍴";
      case "Utilities":
        return "⚡";
      case "Entertainment":
        return "🎬";
      case "Shopping":
        return "🛍️";
      case "Travel":
        return "🚕";
      default:
        return "💳";
    }
  };

  const handleSubmitExpense = (event) => {
    event.preventDefault();

    if (!title.trim() || !amount || !category || !date) {
      alert("Please fill in all fields.");
      return;
    }

    if (Number(amount) <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    if (editingId !== null) {
      setExpenses((currentExpenses) =>
        currentExpenses.map((expense) =>
          expense.id === editingId
            ? {
                ...expense,
                title: title.trim(),
                amount: Number(amount),
                category,
                date,
              }
            : expense
        )
      );

      setEditingId(null);
    } else {
      const newExpense = {
        id: Date.now(),
        title: title.trim(),
        amount: Number(amount),
        category,
        date,
      };

      setExpenses((currentExpenses) => [
        newExpense,
        ...currentExpenses,
      ]);
    }

    clearForm();
  };

  const clearForm = () => {
    setTitle("");
    setAmount("");
    setCategory("");
    setDate(
      new Date().toISOString().split("T")[0]
    );
  };

  const handleEditExpense = (expense) => {
    setTitle(expense.title);
    setAmount(expense.amount);
    setCategory(expense.category);
    setDate(expense.date);
    setEditingId(expense.id);

    setActivePage("Dashboard");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDeleteExpense = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this expense?"
    );

    if (!confirmDelete) {
      return;
    }

    setExpenses((currentExpenses) =>
      currentExpenses.filter(
        (expense) => expense.id !== id
      )
    );
  };

  const filteredExpenses = useMemo(() => {
    return expenses.filter((expense) => {
      const matchesSearch = expense.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesCategory =
        filterCategory === "All" ||
        expense.category === filterCategory;

      return matchesSearch && matchesCategory;
    });
  }, [expenses, searchTerm, filterCategory]);

  /* =========================
     ANALYTICS DATA
  ========================= */

  const categoryTotals = useMemo(() => {
    const totals = {};

    expenses.forEach((expense) => {
      totals[expense.category] =
        (totals[expense.category] || 0) +
        Number(expense.amount);
    });

    return totals;
  }, [expenses]);

  const chartData = useMemo(() => {
    return Object.entries(categoryTotals).map(
      ([categoryName, categoryTotal]) => ({
        name: categoryName,
        amount: categoryTotal,
      })
    );
  }, [categoryTotals]);

  const chartColors = [
    "#151b2b",
    "#596579",
    "#7b8496",
    "#aeb7c9",
    "#c9ced8",
    "#8a93a4",
  ];

  const renderDashboard = () => {
    return (
      <>
        <div className="summary-grid">
          <div className="summary-card">
            <div className="summary-icon">₹</div>

            <div>
              <p>Total Spent</p>
              <h2>{formatMoney(totalSpent)}</h2>
            </div>
          </div>

          <div className="summary-card">
            <div className="summary-icon">↔</div>

            <div>
              <p>Transactions</p>
              <h2>{expenses.length}</h2>
            </div>
          </div>

          <div className="summary-card">
            <div className="summary-icon">₹</div>

            <div>
              <p>Average Expense</p>
              <h2>
                {formatMoney(averageExpense)}
              </h2>
            </div>
          </div>
        </div>

        <div className="dashboard-grid">
          <section className="card add-expense-card">
            <div className="card-header">
              <div>
                <h2>
                  {editingId !== null
                    ? "Edit Expense"
                    : "Add New Expense"}
                </h2>

                <p>
                  {editingId !== null
                    ? "Update your transaction details"
                    : "Record your latest transaction"}
                </p>
              </div>
            </div>

            <form
              className="expense-form"
              onSubmit={handleSubmitExpense}
            >
              <div className="form-group">
                <label htmlFor="expense-title">
                  Expense Title
                </label>

                <input
                  id="expense-title"
                  type="text"
                  placeholder="e.g. Grocery shopping"
                  value={title}
                  onChange={(event) =>
                    setTitle(event.target.value)
                  }
                />
              </div>

              <div className="form-group">
                <label htmlFor="expense-amount">
                  Amount
                </label>

                <input
                  id="expense-amount"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  value={amount}
                  onChange={(event) =>
                    setAmount(event.target.value)
                  }
                />
              </div>

              <div className="form-group">
                <label htmlFor="expense-category">
                  Category
                </label>

                <select
                  id="expense-category"
                  value={category}
                  onChange={(event) =>
                    setCategory(event.target.value)
                  }
                >
                  <option value="">
                    Select Category
                  </option>

                  <option value="Food">Food</option>

                  <option value="Utilities">
                    Utilities
                  </option>

                  <option value="Entertainment">
                    Entertainment
                  </option>

                  <option value="Shopping">
                    Shopping
                  </option>

                  <option value="Travel">
                    Travel
                  </option>

                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="expense-date">
                  Date
                </label>

                <input
                  id="expense-date"
                  type="date"
                  value={date}
                  onChange={(event) =>
                    setDate(event.target.value)
                  }
                />
              </div>

              <button
                type="submit"
                className="add-expense-button"
              >
                {editingId !== null
                  ? "✓ Update Expense"
                  : "+ Add Expense"}
              </button>

              {editingId !== null && (
                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => {
                    setEditingId(null);
                    clearForm();
                  }}
                >
                  Cancel
                </button>
              )}
            </form>
          </section>

          <section className="card transactions-card">
            <div className="card-header">
              <div>
                <h2>Recent Transactions</h2>
                <p>Your latest expenses</p>
              </div>

              <button
                className="view-all-button"
                onClick={() =>
                  setActivePage("Expenses")
                }
              >
                View All
              </button>
            </div>

            <div className="transaction-list">
              {expenses.length === 0 ? (
                <div className="empty-state">
                  <p>No expenses found.</p>
                </div>
              ) : (
                expenses
                  .slice(0, 5)
                  .map((expense) => (
                    <div
                      className="transaction-item"
                      key={expense.id}
                    >
                      <div className="transaction-left">
                        <div className="transaction-icon">
                          {getCategoryIcon(
                            expense.category
                          )}
                        </div>

                        <div>
                          <h3>{expense.title}</h3>

                          <p>
                            {expense.category} •{" "}
                            {expense.date}
                          </p>
                        </div>
                      </div>

                      <div className="transaction-right">
                        <strong>
                          {formatMoney(
                            expense.amount
                          )}
                        </strong>

                        <button
                          className="edit-button"
                          onClick={() =>
                            handleEditExpense(
                              expense
                            )
                          }
                          title="Edit expense"
                        >
                          ✎
                        </button>

                        <button
                          className="delete-button"
                          onClick={() =>
                            handleDeleteExpense(
                              expense.id
                            )
                          }
                          title="Delete expense"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  ))
              )}
            </div>
          </section>
        </div>
      </>
    );
  };

  const renderExpenses = () => {
    return (
      <section className="card full-card">
        <div className="card-header">
          <div>
            <h2>All Transactions</h2>

            <p>
              {filteredExpenses.length} transaction
              {filteredExpenses.length !== 1
                ? "s"
                : ""}
            </p>
          </div>
        </div>

        <div className="expense-tools">
          <input
            type="text"
            placeholder="🔍 Search expenses..."
            value={searchTerm}
            onChange={(event) =>
              setSearchTerm(event.target.value)
            }
          />

          <select
            value={filterCategory}
            onChange={(event) =>
              setFilterCategory(event.target.value)
            }
          >
            <option value="All">
              All Categories
            </option>

            <option value="Food">Food</option>

            <option value="Utilities">
              Utilities
            </option>

            <option value="Entertainment">
              Entertainment
            </option>

            <option value="Shopping">
              Shopping
            </option>

            <option value="Travel">Travel</option>

            <option value="Other">Other</option>
          </select>
        </div>

        <div className="transaction-list">
          {filteredExpenses.length === 0 ? (
            <div className="empty-state">
              <p>
                No expenses match your search.
              </p>
            </div>
          ) : (
            filteredExpenses.map((expense) => (
              <div
                className="transaction-item"
                key={expense.id}
              >
                <div className="transaction-left">
                  <div className="transaction-icon">
                    {getCategoryIcon(
                      expense.category
                    )}
                  </div>

                  <div>
                    <h3>{expense.title}</h3>

                    <p>
                      {expense.category} •{" "}
                      {expense.date}
                    </p>
                  </div>
                </div>

                <div className="transaction-right">
                  <strong>
                    {formatMoney(expense.amount)}
                  </strong>

                  <button
                    className="edit-button"
                    onClick={() =>
                      handleEditExpense(expense)
                    }
                    title="Edit expense"
                  >
                    ✎
                  </button>

                  <button
                    className="delete-button"
                    onClick={() =>
                      handleDeleteExpense(expense.id)
                    }
                    title="Delete expense"
                  >
                    ×
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    );
  };

  const renderAnalytics = () => {
    return (
      <>
        {/* CHARTS */}

        <div className="charts-grid">
          <section className="card chart-card">
            <div className="card-header">
              <div>
                <h2>Spending Distribution</h2>

                <p>
                  Expense percentage by category
                </p>
              </div>
            </div>

            {chartData.length === 0 ? (
              <div className="empty-state">
                <p>No spending data available.</p>
              </div>
            ) : (
              <div className="pie-chart-container">
                <ResponsiveContainer
                  width="100%"
                  height={330}
                >
                  <PieChart>
                    <Pie
                      data={chartData}
                      dataKey="amount"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={105}
                      innerRadius={55}
                      paddingAngle={3}
                    >
                      {chartData.map(
                        (entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={
                              chartColors[
                                index %
                                  chartColors.length
                              ]
                            }
                          />
                        )
                      )}
                    </Pie>

                    <Tooltip
                      formatter={(value) =>
                        formatMoney(value)
                      }
                    />

                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}
          </section>

          <section className="card chart-card">
            <div className="card-header">
              <div>
                <h2>Category Spending</h2>

                <p>
                  Amount spent in each category
                </p>
              </div>
            </div>

            {chartData.length === 0 ? (
              <div className="empty-state">
                <p>No spending data available.</p>
              </div>
            ) : (
              <div className="bar-chart-container">
                <ResponsiveContainer
                  width="100%"
                  height={330}
                >
                  <BarChart
                    data={chartData}
                    margin={{
                      top: 10,
                      right: 15,
                      left: 0,
                      bottom: 10,
                    }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                    />

                    <XAxis
                      dataKey="name"
                      tick={{
                        fontSize: 12,
                      }}
                    />

                    <YAxis
                      tick={{
                        fontSize: 12,
                      }}
                    />

                    <Tooltip
                      formatter={(value) =>
                        formatMoney(value)
                      }
                    />

                    <Bar
                      dataKey="amount"
                      name="Amount"
                      radius={[
                        6,
                        6,
                        0,
                        0,
                      ]}
                      fill="#151b2b"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </section>
        </div>

        {/* EXISTING CATEGORY ANALYTICS */}

        <section className="card full-card analytics-section">
          <div className="card-header">
            <div>
              <h2>Spending by Category</h2>

              <p>
                See how your money is distributed
              </p>
            </div>
          </div>

          <div className="analytics-list">
            {chartData.length === 0 ? (
              <div className="empty-state">
                <p>No spending data available.</p>
              </div>
            ) : (
              chartData.map((item) => {
                const percentage =
                  totalSpent > 0
                    ? (item.amount /
                        totalSpent) *
                      100
                    : 0;

                return (
                  <div
                    className="analytics-item"
                    key={item.name}
                  >
                    <div className="analytics-top">
                      <span>{item.name}</span>

                      <strong>
                        {formatMoney(item.amount)}
                      </strong>
                    </div>

                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{
                          width:
                            percentage + "%",
                        }}
                      ></div>
                    </div>

                    <small>
                      {percentage.toFixed(1)}%
                    </small>
                  </div>
                );
              })
            )}
          </div>
        </section>
      </>
    );
  };

  const renderSettings = () => {
    return (
      <section className="card full-card">
        <div className="settings-item">
          <div>
            <h3>Currency</h3>

            <p>
              Your current currency is Indian Rupee
            </p>
          </div>

          <select defaultValue="INR">
            <option value="INR">
              Indian Rupee (₹)
            </option>

            <option value="USD">
              US Dollar ($)
            </option>

            <option value="EUR">
              Euro (€)
            </option>
          </select>
        </div>

        <div className="settings-item">
          <div>
            <h3>Transactions</h3>

            <p>Total saved transactions</p>
          </div>

          <strong>{expenses.length}</strong>
        </div>

        <div className="settings-item">
          <div>
            <h3>Application Status</h3>

            <p>
              Expense Tracker is running normally
            </p>
          </div>

          <span className="status-badge">
            Active
          </span>
        </div>
      </section>
    );
  };

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="logo">
          <div className="logo-icon">₹</div>

          <div className="logo-text">
            <h2>Expense</h2>
            <h2>Tracker</h2>
          </div>
        </div>

        <nav className="navigation">
          <button
            className={
              activePage === "Dashboard"
                ? "nav-item active"
                : "nav-item"
            }
            onClick={() =>
              setActivePage("Dashboard")
            }
          >
            <span>📊</span>
            Dashboard
          </button>

          <button
            className={
              activePage === "Expenses"
                ? "nav-item active"
                : "nav-item"
            }
            onClick={() =>
              setActivePage("Expenses")
            }
          >
            <span>💳</span>
            Expenses
          </button>

          <button
            className={
              activePage === "Analytics"
                ? "nav-item active"
                : "nav-item"
            }
            onClick={() =>
              setActivePage("Analytics")
            }
          >
            <span>📈</span>
            Analytics
          </button>

          <button
            className={
              activePage === "Settings"
                ? "nav-item active"
                : "nav-item"
            }
            onClick={() =>
              setActivePage("Settings")
            }
          >
            <span>⚙️</span>
            Settings
          </button>
        </nav>

        <div className="sidebar-footer">
          <div className="user-avatar">N</div>

          <div>
            <strong>Netra</strong>
            <span>Expense Tracker</span>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="top-header">
          <div>
            <span className="header-label">
              Expense Tracker
            </span>

            <h1>{activePage}</h1>

            <p>
              {activePage === "Dashboard"
                ? "Welcome back, Netra! Here's an overview of your spending activity"
                : activePage === "Expenses"
                ? "View and manage all your transactions"
                : activePage === "Analytics"
                ? "Understand your spending patterns"
                : "Manage your expense tracker preferences"}
            </p>
          </div>

          <div className="profile">
            <div className="profile-avatar">N</div>

            <div>
              <strong>Netra</strong>

              <span>
                Total spent:{" "}
                {formatMoney(totalSpent)}
              </span>
            </div>
          </div>
        </header>

        <div className="content">
          {activePage === "Dashboard" &&
            renderDashboard()}

          {activePage === "Expenses" &&
            renderExpenses()}

          {activePage === "Analytics" &&
            renderAnalytics()}

          {activePage === "Settings" &&
            renderSettings()}
        </div>
      </main>
    </div>
  );
}

export default App;