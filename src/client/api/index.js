const API_URL = `http://localhost:3000`

export async function fetchItems(category) {
    try {
        const response = await fetch(`${API_URL}/api/${category}`);
        const result = await response.json();
        return result;
    } catch (err) {
        console.error(err)
    }
}

export async function registerUser(username, password) {
    try {
        const response = await fetch(`${API_URL}/api/users/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user: {
                    username,
                    password
                }
            })            
        })
        const result = await response.json();
        console.log(result);
        return result;
    } catch (err) {
        console.error(err);
    }
}

export async function userLogin (username, password){
    try {
        const response = await fetch(`${API_URL}/api/users/login`, {
            method: "POST",
            body: JSON.stringify({
                user: {
                    "username": username, 
                    "password": password
                }
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const result = await response.json();
        return result;
    } catch (err) {
        console.error(err);
    }
}