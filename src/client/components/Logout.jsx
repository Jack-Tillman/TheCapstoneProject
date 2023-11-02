import { useNavigate } from "react-router-dom";

export const Logout = () => {
  sessionStorage.removeItem("token");
  const navigate = useNavigate();
  return (
    <>
      <div id="success-notification">
        <h1>Logged out!</h1>
        <p>Click below to return home</p>
        <button
          id="home-btn"
          onClick={(e) => {
            e.preventDefault();
            navigate("/");
          }}
        >
          Home
        </button>
      </div>
    </>
  );
};
