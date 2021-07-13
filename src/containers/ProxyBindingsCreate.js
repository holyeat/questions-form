import React from 'react';
import createProxy from '../http/createProxy';
import createAccount from '../http/createAccount';

class ProxyBindingsCreate extends React.Component {
    state = {
    }

    componentDidMount() {
        
        this.message = '';
        this.proxiedAddress='';
        this.realAddress = '';
        this.proxiedAddress = '';
        this.enterPasswordMode = 0;
        this.password = '';

        this.state.lastRealAddress = this.parent.proxyCreateBindingState.lastRealAddress;
        this.forceUpdate();
    }

    constructor(props) {
        super(props);

        this.parent = props.parent;
        this.submitHandle = this.submitHandle.bind(this);
        this.submitHandlePassword = this.submitHandlePassword.bind(this);
        this.parent.proxyBindingCreateComponent = this;
        this.lastRealAddress = '';
        this.map = {};
    }
    
    submitHandle(event) 
    {
        event.preventDefault();
        document.getElementById('message').style.display = 'none';
        let realAddress = document.getElementById('real-address').value;
        let proxiedAddress = document.getElementById('proxied-address').value;
        if (realAddress.length === 0 || proxiedAddress.length === 0) {
            return ;
        }

        proxiedAddress = proxiedAddress + '@proxiedmail.com';
        
        if (window.mode !== 'mainpage') {
            createProxy(realAddress, proxiedAddress).then(response => {
                this.parent.rerender(response.data);
    
                document.getElementById('real-address').value = '';
                document.getElementById('proxied-address').value = '';
                this.proxiedAddress = '';
                this.forceUpdate();
            });    
        } else {
            this.realAddress = realAddress;
            this.proxiedAddress = proxiedAddress;

            document.getElementById('real-address').value = '';
            document.getElementById('proxied-address').value = '';
            this.enterPasswordMode = 1;
            this.forceUpdate();
        }
    }

    submitHandlePassword(event) 
    {
        event.preventDefault();
        let password = document.getElementById('password').value;
        if (password.length === 0) {
            return ;
        }
        this.password = password;
        this.forceUpdate();

        createAccount(this.realAddress, this.password).then(response => {
            let token = response.data.attributes.token;
            window.token = 'Bearer ' + token;
            createProxy(this.realAddress, this.proxiedAddress).then(response => {
                window.location.href = '/en/redirect?token='+token + '&to=/en/board?signup_conversion=1';
            });
        }).catch(error => {
            window.location.href = '/en/signin?email=' + encodeURIComponent(this.realAddress);
        });
    }


    error(message) {
        setTimeout(function () {
            document.getElementById('message').style = 'dispaly:block';
        }, 200);
        this.message = message;
    }

    changeHandle () {
        let proxiedAddressInput = document.getElementById('proxied-address');
        if (proxiedAddressInput) {
            let proxiedAddress = proxiedAddressInput.value;
            this.proxiedAddress = proxiedAddress;
            this.forceUpdate();
        }
    }
    
    makeid(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
     }
     

    onKeyDown (event) {
        let e = event || window.event;  // get event object
        let key = !e.charCode ? e.which : e.charCode; // get key cross-browser
        
        this.map[key] = e.type == 'keydown';
        if (this.map[16] === true && this.map[50] === true) {
            event.preventDefault();
            return false;
        }
    }

    generateRandomAddress(link) {
        link.preventDefault();
        let proxyBindingAddress = this.makeid(10).toLowerCase();
        document.getElementById('proxied-address').value = proxyBindingAddress;
        this.changeHandle();
    }

    onTodoChange(value){
        this.setState({
             lastRealAddress: value
        });
    }


    render() {
        let none = {'display':'none'};
        let loaderStyle = this.password && this.password.length > 0 ? {'display':'block'} : {'display':'none'};
        let passwordFormStyle = this.password && this.password.length > 0 ? {'display':'none'} : {'display':'block'};
        const btnStyle = {'color': '#007bff'};
        const labelStyle = {};

        if (!this.enterPasswordMode) {
            return (
                <div>
                    <div className="alert alert-warning" id="message" style={none} role="alert">{this.message}</div>
    
                    <form className="create__form" onSubmit={this.submitHandle}>
                    <div className="create__form-inner">

                    <div className="form__realaddress">
                        <div className="form__title" for="real-address">Real address</div>   
                        <input type="text"  id="real-address"
                        value={this.state.lastRealAddress} 
                        onChange={e => this.onTodoChange(e.target.value)}
                        placeholder="John@gmail.com"/>
                    </div>

                    <div className="form__proxiedmailaddress">
                    <div className="form__title" style={labelStyle} htmlFor="password">ProxiedMail Address {this.proxiedAddress}@proxiedmail.com</div>
                    <button className="form__proxiedmailaddress-btn light__btn" onClick={this.generateRandomAddress.bind(this)}>
                        Generate random address
                    </button>
                    <input type="input" onKeyDown={(this.onKeyDown.bind(this))}  onKeyUp={(this.onKeyDown.bind(this))} onChange={(this.changeHandle.bind(this))} className="form__input" id="proxied-address" placeholder="Proxied Email (example: john)"/>
                    <button id="proceed" type="submit" className="form__btn btn btn-primary">Create</button>

                    </div>

                        </div>
                    </form>
                </div>
        )
            ;    
        } else {
            return (
             <div>
                                     <form className="create__form" onSubmit={this.submitHandlePassword}>

                    <div className="create__form-inner">

               <div className="spinner-border" role="status" id="loader" style={loaderStyle}>
                    <span className="sr-only">Loading...</span>
                </div>

                <div style={passwordFormStyle}>
                 <p className="lead">Your email: <i>{this.realAddress}</i></p>
                 <p className="lead">To finish adding proxy, please choose password to manage it.</p><br/>
                       <div className="form__proxiedmailaddress">
                        <label className="form__title" htmlFor="real-address">Password</label>
                        <br/>
                        <input type="password" style={{'margin': 0}} className="form__input" id="password" placeholder="Password"/>
                        </div>
                        <button id="proceed"  type="submit" className="form__btn btn">Finish</button>
                </div>
             </div>   
             </form>
             </div>
            );
        }
    }
}
export default ProxyBindingsCreate
