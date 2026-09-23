function Sidebar({ activePage, onNavigate }) {
  const menuItems = [
    {
      name: "Dashboard",
      icon: "📊",
    },
    {
      name: "Expenses",
      icon: "💳",
    },
    {
      name: "Analytics",
      icon: "📈",
    },
    {
      name: "Settings",
      icon: "⚙️",
    },
  ];

  return (
    <aside className="sidebar">

      <div className="logo">

        <div className="logo-icon">
          ₹
        </div>

        <div>
          <h2>Expense</h2>
          <span>Tracker</span>
        </div>

      </div>

      <nav className="sidebar-nav">

        {menuItems.map((item) => (
          <button
            key={item.name}
            className={`nav-item ${
              activePage === item.name
                ? "active"
                : ""
            }`}
            onClick={() =>
              onNavigate(item.name)
            }
          >
            <span>{item.icon}</span>

            {item.name}
          </button>
        ))}

      </nav>

      <div className="sidebar-footer">
        <p>Personal Finance</p>

        <small>
          Manage your money wisely
        </small>
      </div>

    </aside>
  );
}

export default Sidebar;