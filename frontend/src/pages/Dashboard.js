import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar"; // Import Navbar

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const res = await axios.get("http://localhost:5000/api/user/me", config);
        setUser(res.data);
      } catch (error) {
        console.error("Error fetching user data", error);
        navigate("/login"); // Redirect to login if not authenticated
      }
    };

    fetchUserData();
  }, [navigate]);

  return (
    <div>
      <Navbar /> {/* Add Navbar at the top */}
      <h1>Dashboard</h1>
      {user ? (
        <div>
          <p>Welcome, {user.name}!</p>
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Dashboard;
