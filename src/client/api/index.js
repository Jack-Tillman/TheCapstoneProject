const API_URL = "http://localhost:3000/api";

export async function fetchItems(category) {
  try {
    const response = await fetch(`${API_URL}/${category}`);
    // console.log(response);
    // const result = await response.json();
    return response;
  } catch (err) {
    console.error(err);
  }
}

export async function registerUser(email, password) {
  try {
    const response = await fetch(`${API_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({        
          email,
          password,        
      }),
    });
    console.log(response);
    return response;
  } catch (err) {
    console.error(err);
  }
}

export async function userLogin(email, password) {
  try {
    const response = await fetch(`${API_URL}/users/login`, {
      method: "POST",
      body: JSON.stringify({
        user: {
          email: email,
          password: password,
        },
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    return result;
  } catch (err) {
    console.error(err);
  }
}
