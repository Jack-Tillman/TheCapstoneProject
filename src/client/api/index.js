const API_URL = "http://localhost:3000/api";

export async function fetchItems(category) {
  try {
    const response = await fetch(`${API_URL}/${category}`);
    return response;
  } catch (err) {
    console.error(err);
  }
}

export async function fetchSingleItem(stripe_id, category) {
  try {
      const response = await fetch(`${API_URL}/${category}/${stripe_id}`);      
      return response;
  } catch (err) {
      console.error(`Oh no, trouble fetching item #${stripe_id}!`, err);
  }
};

export async function registerUser(name, email, password) {
  try {
    const response = await fetch(`${API_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

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
        email,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response;
  } catch (err) {
    console.error(err);
  }
}