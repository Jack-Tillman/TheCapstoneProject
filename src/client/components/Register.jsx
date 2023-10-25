import { useState } from "react";
import { registerUser } from "../api/index";
import PasswordChecklist from "react-password-checklist";


export const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordAgain, setPasswordAgain] = useState("");
    const [error, setError] = useState(null);

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
                <label>
                    Username: <input value={username} onChange={(e) => setUsername(e.target.value)} minLength={8} required/>
                </label>
                <br />
                <label>
                    Password: <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} minLength={8} required/>
                </label>
                <br />
                <label>
                    Confirm Password: <input type="password" value={password} onChange={(e) => setPasswordAgain(e.target.value)} minLength={8} required/>
                </label>
                <PasswordChecklist
                    rules={["minLength", "specialChar", "number", "capital", "match"]}
                    minLength={8}
                    value={password}
                    valueAgain={passwordAgain}
                    messages={{
                        minLength: "Password must be 8 characters or more.",
                        specialChar: "Password must contain a special character",
                        number: "Password must contain a number",
                        capital: "Password must contain a capital letter",
                        match: "Password fields must match"
                    }}
                />

                <button id="submit" type="submit">Submit</button>
            </form>        
        </>
    ) 
}
