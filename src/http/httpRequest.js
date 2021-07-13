function httpRequest(url, method, body) {
  let data = {
    credentials: 'include',
    'method': method,
    credentials: 'omit',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': window.token
    },
  };
  if (method !== 'GET' && method !== 'DELETE') {
    data.body = JSON.stringify(body);
  }


    return fetch(window.api + url, data)
      .then(response => {

        if (response.status !== 200 && response.status !== 201 && response.status !== 204) {
          let error = (new Error('Request failed'));
          error.json = response.json();
          throw error; 
        }

        if (method !== 'DELETE') {
          return response.json()
        } else {
          return response;
        }
      }
      );
}

export default httpRequest;
