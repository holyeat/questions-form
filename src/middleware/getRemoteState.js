export function getRemoteState(type, userId)
{
  return fetch(window.host + '/launch-api/api/state-store/'+ userId + '/'+type , {
    credentials: 'include',
    method: 'GET',                                                              
    'mode': 'cors',
    redirect: 'follow',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization':  window.token,
    }
    }).then(response => response.json())
};

export default getRemoteState;