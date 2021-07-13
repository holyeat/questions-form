import httpRequest from './httpRequest';

function createAccount(username, password) {
    return httpRequest('users', 'POST', 
    {
        "data" :{
            "type": "users",
            "attributes": {
               "username": username,
               "password": password
            }
        }
    });
}

export default createAccount;
