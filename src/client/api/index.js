const API_URL = "http://localhost:3000/api";

export async function fetchItems(category) {
  try {
    const response = await fetch(`${API_URL}/${category}`);
    return response;
  } catch (err) {
    console.error(err);
  }
}

export const fetchSingleItem = async (id, category) => {
  try {
      const response = await fetch(`${API_URL}/${category}/${id}`);      
      return response;
  } catch (err) {
      console.error(`Oh no, trouble fetching item #${id}!`, err);
  }
};

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