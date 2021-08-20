export function sendSms(phone)
{
  return fetch(window.host + '/sendSms' , {
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
      'recipient': phone,
    }),
  }).then(response => response.json())
};

export default sendSms;