import { useState } from "react";
import { userLogin } from "../api/index";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import FilledInput from "@mui/material/FilledInput";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Alert } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { LoginSnackbar } from "./Snackbar";
import { ErrorSnackbar } from "./ErrorSnackbar";

export const Login = ({ token, setToken, admin, setAdmin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  //success tracks if login attempt succeeded or not in order to conditionally render the Snackbar
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await userLogin(email, password);
      const result = await response.json();
      console.log(result);
      sessionStorage.setItem("admin", result.user.isadmin);
      sessionStorage.setItem("token", result.token);
      sessionStorage.setItem("user", JSON.stringify(result.user));
      const authToken = sessionStorage.getItem("token");
      const authAdmin = sessionStorage.getItem("admin");
      if (response.status === 200) {
        if (result.user.isadmin === true) {
          console.log(`Truthy admin: ${authAdmin}`);
        } else {
          sessionStorage.removeItem("admin");
          console.log(`Falsey admin: ${authAdmin}`);
        }

        setToken(authToken);
        setSuccess(true);
        setTimeout(() => {
          navigate("/");
        }, 1250);
      } else {
        setError(result);
      }
      setEmail("");
      setPassword("");
      setMessage(response.message);
    } catch (error) {
      setError({name: "Incorrect login information", message:"No user account with that email and password found"});
    }
  };

  return (
    <Box className="loginRegisterField">
      {error && <ErrorSnackbar error={error} />}
      {success && <LoginSnackbar />}
      <>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div>
            {/*<label htmlFor='email'>Email:</label>
           <input
           type='email'
           id='email'
           value={email}
            onChange={handleEmailChange}
            required
          /> */}
            <FormControl sx={{ m: 1, width: "1" }} variant="outlined">
              <TextField
                required
                id="outlined-required"
                label="Email"
                value={email}
                onChange={handleEmailChange}
              />
            </FormControl>
          </div>
          <div>
            {/* <label htmlFor='password'>Password:</label>
          <input
          type='password'
          id='password'
          value={password}
          onChange={handlePasswordChange}
          required
        /> */}
            <FormControl sx={{ m: 1, width: "1" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
                // type='password'
                // id='password'
                value={password}
                onChange={handlePasswordChange}
                required
              />
            </FormControl>
          </div>
          {/* <button type='submit'>Login</button> */}
          <Button
            disabled={false}
            color="primary"
            variant="contained"
            type="submit"
            sx={{ width: "1" }}
          >
            Login
          </Button>
        </form>
        <p>Don't have an account?</p>
        <Link to="/register" style={{ color: "black" }}>
          <Button variant="outlined" sx={{ width: "1" }}>
            Register
          </Button>
        </Link>
        <p>{message}</p>
      </>
    </Box>
  );
};

/*


      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
           <Alert
             onClose={handleClose}
             severity="success"
             sx={{ width: "100%" }}
           >
             This is a success message!
           </Alert>
         </Snackbar>



*/