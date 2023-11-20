import { Routes, Route } from "react-router-dom";
import { Login } from "./Login";
import { Logout } from "./Logout";
import { Register } from "./Register";
import { HomePage } from "./HomePage";
import { Success } from "./Success";
import { Cancel } from "./Cancel";
// import { GamesPage } from "./GamesPage";
// import { MerchPage } from "./MerchPage";
// import { HardwarePage } from "./HardwarePage";
import { Dashboard } from "./Dashboard";
import { StorePage } from "./StorePage";
import { SingleProduct } from "./SingleProduct";
import { useState } from "react";

const MainSection = ({ token, setToken }) => {
  const [productStripe, setProductStripe] = useState(null);
  //snackbar states - I kept the non-descriptive state names only because changing them broke everything even when all calls to it were adjusted as well
  //Need to add a clickaway listener so that clicking out of the snackbar also closes it (  https://mui.com/base-ui/react-click-away-listener/   )
  const [state, setState] = useState({
    open: true,
    vertical: "top",
    horizontal: "left",
  });

  const { vertical, horizontal, open } = state;

  const handleClick = (state) => () => {
    setState({ ...state, open: true });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  return (
    <div className="">
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              state={state}
              setState={setState}
              open={open}
              handleClose={handleClose}
              handleClick={handleClick}
            />
          }
        />
        <Route
          path="/login"
          element={
            <Login
              token={token}
              setToken={setToken}
              state={state}
              setState={setState}
              open={open}
              handleClose={handleClose}
              handleClick={handleClick}
            />
          }
        />
        <Route
          path="/register"
          element={<Register token={token} setToken={setToken} />}
        />
        <Route
          path="/store"
          element={
            <StorePage
              productStripe={productStripe}
              setProductStripe={setProductStripe}
            />
          }
        />
        <Route
          path="/store/details"
          element={
            <SingleProduct
              productStripe={productStripe}
              setProductStripe={setProductStripe}
            />
          }
        />
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />

        {/* <Route path="/games" element={<GamesPage />} />
        <Route path="/hardware" element={<HardwarePage />} />
        <Route path="/merch" element={<MerchPage />} /> */}

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </div>
  );
};

export default MainSection;
