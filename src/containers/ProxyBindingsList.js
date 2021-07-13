import React from 'react';
import ProxyBindingsListRequest from '../http/proxyBindingsListRequest';
import deleteBinding from '../http/deleteBinding';
import patchProxy from '../http/patchProxy';

class ProxyBindingsList extends React.Component {
    isLoaded = 0;

    constructor(props) {
        super(props);

        this.props = props;
        this.bindings = [];
        this.props.parent.proxyBindingsListComponent = this;
    }
    
    componentDidMount() {

        if (window.mode !== 'mainpage') {
            this.load();
        } else {
            this.isLoaded = 1;
            this.forceUpdate();
        }
    }

    load() {
        this.bindings = ProxyBindingsListRequest().then(response => {
            this.bindings = response.data;
            this.props.state.proxyBindings = this.bindings;
            if (this.bindings.length > 0) {
                const lastBinding = this.bindings[this.bindings.length - 1];


                const length = Object.keys(lastBinding.attributes.real_addresses).length;

                console.log(length);

                this.props.parent.proxyCreateBindingState.lastRealAddress = Object.keys(lastBinding.attributes.real_addresses)[length-1];
                this.props.parent.proxyBindingCreateComponent.componentDidMount();
            }
            this.isLoaded = 1;
            this.forceUpdate();
        });
    }

    remove(item, realAddress)
    {
        if (Object.keys(item.attributes.real_addresses).length === 1) {
            deleteBinding(item.id);
            this.props.state.proxyBindings = this.props.state.proxyBindings.reduce((acc, reduceItem) => {
                if (item.id !== reduceItem.id) {
                     acc.push(reduceItem);
                }
                return acc;
            }, []);
            this.forceUpdate();
        } else {
            let realAddresses = Object.keys(item.attributes.real_addresses).reduce((acc, reduceItem) => {

                console.log(realAddress, reduceItem);
                if (reduceItem !== realAddress) {
                    acc[reduceItem] = item.attributes.real_addresses[reduceItem];
                }

                return acc;
            }, []);

            console.log(realAddresses);
            patchProxy(item.id, realAddresses, item.attributes.proxy_address, true).then(response => {
                this.props.state.proxyBindings = this.props.state.proxyBindings.reduce((acc, reduceItem) => {
                    if (item.id !== response.data.id) {
                         acc.push(reduceItem);
                    } else {
                        acc.push(response.data);
                    }

                    return acc;
                }, []);    
            });
        }
    }


    changeStatus(item, realAddress)
    {   
        let realAddresses = item.attributes.real_addresses;
        realAddresses[realAddress] = !item.attributes.real_addresses[realAddress];


        patchProxy(item.id, realAddresses, item.attributes.proxy_address).then(response => {
            this.props.state.proxyBindings = this.props.state.proxyBindings.reduce((acc, reduceItem) => {

                console.log()

                if (reduceItem.id !== response.data.id) {
                     acc.push(reduceItem);
                } else {
                    acc.push(response.data);
                }

                return acc;
            }, []);
            this.forceUpdate();
        });
    }


    render() {
        let styleDisplay, spinnerStyle;
        if (this.props.state.proxyBindings.length === 0) {
            styleDisplay = {'display':'none'};
        } else {
            styleDisplay = {'display':'table'};
        }
        spinnerStyle = this.isLoaded === 0 ? {'display':'table'} : {'display':'none'};

        return (
            <div>
            <div className="spinner-border" role="status" id="loader" style={spinnerStyle}>
            <span className="sr-only">Loading...</span>
            </div>



        <table className="table" id="table" style={styleDisplay}>
            <thead>
                <tr>
                    <th scope="col">Real email</th>
                    <th scope="col">Proxy Email</th>
                    <th scope="col">Received Emails</th>
                    <th scope="col">Manage</th>
                </tr>
            </thead>
            <tbody>
            {this.props.state.proxyBindings.map((item, index) =>
                Object.keys(item.attributes.real_addresses).map((real_address) => (
                <tr>
                    <td>{real_address}</td>
                    <td>{item.attributes.proxy_address}</td>
                    <td>{item.attributes.received_emails} ({item.attributes.real_addresses[real_address] ?
                         <font style={{color: 'green'}}>Enabled</font> : <font style={{color: 'red'}}>Disabled</font> })</td>


                    <td>
                        <button
                            type="button"
                            className="btn btn-sm btn-danger pb-remove"
                            onClickCapture={click => this.remove(item, real_address)}
                            style={{'font-size': '11px'}}
                        >
                            Remove
                        </button>

                        <button
                            type="button"
                            className={item.attributes.real_addresses[real_address] ? "btn btn-sm btn-secondary pb-status-change" : 'btn btn-sm btn-success pb-status-change'}
                            onClickCapture={click => this.changeStatus(item, real_address)}
                            style={{'margin-left': '4px', 'font-size': '11px'}}
                        >
                            {item.attributes.real_addresses[real_address] ? 'Disable' : 'Enable'}
                        </button>

                            <hr/>
                        </td>

                </tr>
                )
                ))}
            </tbody>
            </table>
            </div>
        );
    }
}
export default ProxyBindingsList;
