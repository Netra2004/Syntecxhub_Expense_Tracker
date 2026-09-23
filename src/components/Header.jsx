function Header({ activePage = "Dashboard", totalSpent = 0 }) {
  return (
    <header className="header">
      <div className="header-left">
        <h1>{activePage}</h1>
        <p>Welcome back!</p>
      </div>

      <div className="header-right">
        <div className="header-total">
          <span>Total Spent</span>
          <strong>
            ₹{Number(totalSpent).toLocaleString("en-IN")}
          </strong>
        </div>

        <div className="header-profile">
          <div className="profile-avatar">N</div>

          <div className="profile-info">
            <strong>Netra</strong>
            <span>Personal Account</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;