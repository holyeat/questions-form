export function fetchAccounts()
{
  return fetch(window.host + '/sl/dropbox-accounts', {
    credentials: 'include',
  }).then(response => response.json())
};

export default fetchAccounts;