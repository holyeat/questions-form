import httpRequest from './httpRequest';

function proxyBindingsListRequest() {
    return httpRequest('proxy-bindings', 'GET', {});
}

export default proxyBindingsListRequest;
