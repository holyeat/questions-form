export function submitForm(userId)
{
  return fetch(window.host + '/launch-api/internal/api/form/' , {
    credentials: 'include',
    method: 'POST',                                                              
    'mode': 'cors',
    redirect: 'follow',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization':  window.token,
    },  
    'body': JSON.stringify({
      'test':'test'
    }),
  }).then(response => response.json())
};

export default submitForm;