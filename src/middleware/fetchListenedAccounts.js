export function fetchListenedAccounts()
{
  return fetch(window.host + '/sl/listened-accounts', {
    credentials: 'include',
  }).then(response => response.json())
};

export default fetchListenedAccounts;
