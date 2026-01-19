import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.code}>403</h1>
      <h2 style={styles.title}>Unauthorized Access</h2>
      <p style={styles.text}>
        You do not have permission to view this page.
      </p>

      <Link to="/" style={styles.link}>
        Go to Login
      </Link>
    </div>
  );
};

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9fafb",
  },
  code: {
    fontSize: "96px",
    margin: 0,
    color: "#ef4444",
  },
  title: {
    fontSize: "28px",
    marginBottom: "10px",
  },
  text: {
    fontSize: "16px",
    color: "#555",
    marginBottom: "20px",
  },
  link: {
    padding: "10px 20px",
    backgroundColor: "#2563eb",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "5px",
  },
};

export default Unauthorized;
