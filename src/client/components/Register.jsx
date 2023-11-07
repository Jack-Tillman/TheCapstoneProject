import { useState, useEffect } from "react";
import { registerUser } from "../api/index";
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
import PasswordChecklist from "react-password-checklist";
import { Link, useNavigate } from "react-router-dom";
import { sizing } from "@mui/system";

import { Button } from "@mui/material";
// import { Button }  from '@mui/material-next/Button';

export const Register = ({ token, setToken }) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [success, setSuccess] = useState(false);
  const [authenticated, setAuthenticated] = useState(
    sessionStorage.getItem("authenticated") || false
  );
  const [error, setError] = useState(null);

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (authenticated) {
      setToken(authenticated);
    }
  }, [authenticated]);

  async function handleSubmit(event) {
    event.preventDefault();
    const response = await registerUser(email, password);
    const result = await response.json();
    console.log(result);
    sessionStorage.setItem("token", result.token);
    const authToken = sessionStorage.getItem("token");

    if (response.status === 200) {
      setToken(authToken);
      // sessionStorage.setItem("token", response.data.token)
      setEmail("");
      setPassword("");
      setPasswordAgain("");
      setAuthenticated(result.token);
      setSuccess(true);
      navigate("/");
    } else {
      setError(response.error);
    }
  }

  return (
    <Box className="loginRegisterField">
      <h2 className="sign-up">Sign Up</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        {/* <label>
                    Username: <input value={username} onChange={(e) => setUsername(e.target.value)} minLength={8} required/>
                </label> */}
        <FormControl sx={{ m: 1, width: "1" }} variant="outlined">
          <TextField
            required
            id="outlined-required"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            minLength={8}
          />
        </FormControl>
        <br />
        {/* <label>
                    Password: <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} minLength={8} required/>
                </label> */}
        <FormControl sx={{ m: 1, width: "1" }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password1">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password1"
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
            onChange={(e) => setPassword(e.target.value)}
            minLength={8}
            required
          />
        </FormControl>
        <br />
        {/* <label>
                    Confirm Password: <input type="password" value={password} onChange={(e) => setPasswordAgain(e.target.value)} minLength={8} required/>
                </label> */}
        <FormControl sx={{ m: 1, width: "1" }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password2">
            Confirm Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password2"
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
            value={passwordAgain}
            onChange={(e) => setPasswordAgain(e.target.value)}
            minLength={8}
            required
          />
        </FormControl>
        <PasswordChecklist
          className="pwChecklist"
          rules={["minLength", "specialChar", "number", "capital", "match"]}
          minLength={8}
          value={password}
          valueAgain={passwordAgain}
          messages={{
            minLength: "Password must be 8 characters or more.",
            specialChar: "Password must contain a special character",
            number: "Password must contain a number",
            capital: "Password must contain a capital letter",
            match: "Password fields must match",
          }}
        />
        <Button
          id="submit"
          disabled={false}
          color="primary"
          variant="contained"
          type="submit"
          sx={{ width: "1" }}
        >
          Submit
        </Button>
      </form>
      <p>
        Already have an account?{" "}
       </p> 
            <Link to="/login" style={{ color: "black" }}>
          <Button variant="outlined" sx={{width:"1"}}>Login
        </Button></Link>
      
    </Box>
  );
};
