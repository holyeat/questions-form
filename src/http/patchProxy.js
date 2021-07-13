import httpRequest from './httpRequest';

function patchProxy(id, realAddresses, proxyAddress) {
    return httpRequest('proxy-bindings/'+id, 'PATCH', 
    {
        "data" :{
            "id": id,
            "type": "proxy_bindings",
            "attributes": {
               "real_addresses": realAddresses,
               "proxy_address": proxyAddress
            }
        }
    });
}

export default patchProxy;
