export function checkSms(phone, code)
{
  return fetch(window.host + '/checkSms' , {
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
      'code': code,
    }),
  }).then(response => response.json())
};

export default checkSms;