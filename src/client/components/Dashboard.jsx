import { useState, useEffect } from "react"
import { fetchAllUsers } from "../api"

export const Dashboard = () => {

    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function getUsers() {
            const response = await fetchAllUsers();
            const result = await response.json();

            if (response.status === 200) {
                setUsers(result);
            } else {
                setError(response.error)
                console.error(error)
            }
        }
        getUsers();
    }, [])

    return (
        <>
            <h1>This is the user dashboard.</h1>
            <h2>Congratulations on being a user</h2>
        </>
    )
}