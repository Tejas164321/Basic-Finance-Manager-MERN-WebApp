import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token
    navigate("/login"); // Redirect to login page
  };

  return (
    <nav style={{ display: "flex", justifyContent: "space-between", padding: "10px", background: "#f0f0f0" }}>
      <Link to="/dashboard" style={{ textDecoration: "none", fontSize: "18px", fontWeight: "bold" }}>Dashboard</Link>
      <button onClick={handleLogout} style={{ padding: "5px 10px", cursor: "pointer", background: "red", color: "white", border: "none" }}>
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
