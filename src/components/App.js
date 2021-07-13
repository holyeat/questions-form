import React from 'react'
import ProxyBindingsCreate from '../containers/ProxyBindingsCreate';
import ProxyBindingsList from '../containers/ProxyBindingsList';


class App extends React.Component {

    constructor(props)
    {
        super(props);
        this.state = {
            'proxyBindings': []
        };
        this.proxyCreateBindingState = {
            'lastRealAddress': '',
        };
        this.proxyBindingCreateComponent = null;
    }

    rerender(proxyBindings) {
        const length = Object.keys(proxyBindings.attributes.real_addresses).length;
        if (length > 1) {
            const realAddress = proxyBindings.attributes.real_addresses;
            proxyBindings.attributes.real_addresses[Object.keys(realAddress)[length -1]] = Object.values(realAddress)[length -1];
        }


        if (length > 1) {
            console.log(length, proxyBindings.attributes.real_addresses);
            this.state.proxyBindings = this.state.proxyBindings.reduce(function (acc, item) {
                if (item.id === proxyBindings.id) {
                    acc.push(proxyBindings);
                } else {
                    console.log(item);
                    acc.push(item);
                }

                return acc;
            }, []);
            console.log(this.state.proxyBindings);
        } else {
            console.log('t');
            this.state.proxyBindings.push(proxyBindings);
        }

        this.proxyBindingsListComponent.load();

        this.forceUpdate();
    }

    render() {
        return (
            <div>
                <ProxyBindingsList state={this.state} parent={this}/>
                <ProxyBindingsCreate parent={this} state={this.proxyCreateBindingState}/>
          </div>        
        );
    }
}


export default App
