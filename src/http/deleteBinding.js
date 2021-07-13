import httpRequest from './httpRequest';

function deleteBinding(bindingId) {
    return httpRequest('proxy-bindings/' + bindingId, 'DELETE', {});
}

export default deleteBinding;
