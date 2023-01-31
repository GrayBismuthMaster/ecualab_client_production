import jwtDecode from 'jwt-decode';
const ACCESS_TOKEN_KEY = 'token';
// const API_URL = 'https://server.crissol.link';

const API_URL = 'http://localhost:9000';
const ISSERVER = typeof window === "undefined";

export function getAccessToken() {
  if(!ISSERVER) {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  }
}

export function getUser() {
  if(!ISSERVER) {
    const token = getAccessToken();
    console.log("desde el getUser", token);
    if (!token) {
      return null;
    }
    return getUserFromToken(token);
  }
}

export async function login(userId, password) {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ userId, password }),
  });
  if (response.ok) {
    const { token } = await response.json();
    await localStorage.setItem(ACCESS_TOKEN_KEY, token);
    return { id: userId };
  }
  return null;
}

export function logout() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
}

function getUserFromToken(token) {
  if(!ISSERVER){
    console.log("desde el getUserFromToken", token);
    const jwtPayload = jwtDecode(token)
    console.log(jwtPayload.sub);
    return { usuario:{id: jwtPayload.sub} };

  }
}
