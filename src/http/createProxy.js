import httpRequest from './httpRequest';

function createProxy(realAddress, proxyAddress) {
    return httpRequest('proxy-bindings', 'POST', 
    {
        "data" :{
            "type": "proxy_bindings",
            "attributes": {
               "real_addresses": [realAddress],
               "proxy_address": proxyAddress
            }
        }
    });
}

export default createProxy;
