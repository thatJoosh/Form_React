import { useState } from "react";

export default function SignUpForm({setToken}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);

    async function handleSubmit(event) {
        event.preventDefault();
        console.log("Hello");

        if (password.length < 8) {
            setPasswordError("Password must be at least 8 characters.")
            return;
        }

        setPasswordError(null);

        try {
            const response = await fetch(
                "https://fsa-jwt-practice.herokuapp.com/signup",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({username, password} 
                    ),
                }
              );
              const result = await response.json();
              console.log(result);
              setToken(result.token);

        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <>
            <div className="container">
            <h2>Sign Up!</h2>
            {error && <p>{error}</p>}
            
            <form onSubmit={handleSubmit}>
                <label>
                    Username: {" "}
                    <input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)} />
                </label>
                <label>
                    Password: {" "}
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                    {passwordError && <p className="password-error">{passwordError}</p>}
                </label>
                <button>Submit</button>
            </form>
            </div>
        </>
    );
}