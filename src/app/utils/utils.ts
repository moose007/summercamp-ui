import toast from "react-hot-toast";

export function accessibleRouteChangeHandler() {
  return window.setTimeout(() => {
    const mainContainer = document.getElementById("primary-app-container");
    if (mainContainer) {
      mainContainer.focus();
    }
  }, 50);
}

export function getBearerToken() {
  const tokenString = localStorage.getItem('token');
  if (tokenString != null && tokenString != "undefined") {
    return tokenString;
  }
  return null
}


export async function getUserInfo(){
  return fetch(process.env["API_URL"] + '/users/me', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + getBearerToken()
    }
  }).then(response => {return parseResponse(response)});
}



export async function createAccount(payload) {
  return fetch(process.env["API_URL"] + '/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + getBearerToken()
    },
    body: JSON.stringify(payload)
  }).then(data => {
    toast("Successfully created account!");
    return data;
  })
}

export async function loginUser(credentials) {
  return fetch(process.env["API_URL"] + '/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  }).then(data => {
    return parseResponse(data);
  })
}

function parseResponse(response) {
   if (response.ok){
      return response.json();
    } else if (response.statusCode == 401) {
     logout();
      return response.json();
    }
}




export const NullComponent= () => {
  return null;
};

export const logout = () => {
  localStorage.clear();
  window.location.reload(false);
}