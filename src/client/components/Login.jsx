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

export const Login = ({ token, setToken }) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);

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
    const response = await userLogin(email, password);
    const result = await response.json();
    console.log(result);
    const storageToken = sessionStorage.setItem("token", result.token);
    const authToken = sessionStorage.getItem("token");

    if (response.status === 200) {
      setToken(authToken);
      navigate("/");
    } else {
      setError(response.error);
    }
    setEmail("");
    setPassword("");
    setMessage(response.message);
  };

  return (
    <Box className="loginRegisterField">
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
      <p>
        Don't have an account?{" "}
        <Link to="/register" style={{ color: "black" }}>
          Register
        </Link>
      </p>
      <p>{message}</p>
    </Box>
  );
};
