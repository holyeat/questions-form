export function submitForm(userId, body)
{
  return fetch(window.host + '/formSubmit' , {
    credentials: 'include',
    method: 'POST',                                                              
    'mode': 'cors',
    redirect: 'follow',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization':  window.token,
    },  
    'body': JSON.stringify(body),
  }).then(response => response.json())
};

export default submitForm;