import React, { useState } from 'react';
import { registerUser } from "../api/index";
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

    async function handleSubmit(event) {
        event.preventDefault();  
        const response = await registerUser(username, password)
        sessionStorage.setItem("token", response.data.token)
        const authToken = sessionStorage.getItem("token")
        console.log(authToken);
        if (response.success) {
            return response;
        } else {
            setError(response.error);
        }
    }

    return (
        <>        
            <h2 className="sign-up">Sign Up</h2>
            { error && <p>{error}</p> }
            <form onSubmit={handleSubmit}>
                {/* <label>
                    Username: <input value={username} onChange={(e) => setUsername(e.target.value)} minLength={8} required/>
                </label> */}
                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                    <TextField
                        required
                        id="outlined-required"
                        label="Email"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        minLength={8}
                    /></FormControl>
                <br />
                {/* <label>
                    Password: <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} minLength={8} required/>
                </label> */}
                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? 'text' : 'password'}
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
                <button type="submit">Submit</button>
            </form>        
        </>
    ) 
}
