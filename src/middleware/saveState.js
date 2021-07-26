export function saveState(type, userId, state)
{
  return fetch(window.host + '/launch-api/internal/api/state-store', {
    credentials: 'include',
    method: 'PATCH',                                                              
    'mode': 'cors',
    redirect: 'follow',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization':  window.token,
    },
    body: JSON.stringify( {
      'data' : {
        'type': 'state_stores',
        'id': 'new',
        'attributes': {
          'type': type,
          'state': state,
        },
        'relationships': {
          'user': {
            'data' : {
              'id': userId,
              'type': 'users',
            }
          }
        }
      }

    } )  
  }).then(response => response.json())
};

export default saveState;