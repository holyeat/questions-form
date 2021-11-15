import React from 'react'
import Error from '../containers/Error';
import FormTitle from '../containers/FormTitle';

class PhoneNumber extends React.Component
{ 
    constructor(props)
    {
        super(props);
        this.handleChange=this.handleChange.bind(this);
        this.handleChangeConfirmationCode=this.handleChangeConfirmationCode.bind(this);
        this.changePhoneNumber=this.changePhoneNumber.bind(this);
        this.confirmationCode = '';
    }

    componentDidMount(){
        this.nameInput.focus();
    }
    
    handleChange(event)
    {
        this.props.parent.dispatch({'type':'changeCurrentValue' , 'currentValue': event.target.value});
        this.forceUpdate();
    }

    handleChangeConfirmationCode(event)
    {
        this.confirmationCode = event.target.value;
        this.props.parent.dispatch({'type':'changeConfirmationCode' , 'confirmationCode': this.confirmationCode});
        this.forceUpdate();
    }

    changePhoneNumber(event)
    {
        event.preventDefault();
        this.props.parent.dispatch({'type':'phoneNumberPreviousStep'});
    }

    render()
    {
        console.log(this.confirmationNeeded());
        if (this.confirmationNeeded()) {
            return this.renderConfirmation();
        }

        return this.renderPhoneInput();
    }

    renderPhoneInput() {
        const step = this.props.config;

        return <div className="form__main">

        <FormTitle step={step}/>

        <div className="form__group">
            <input ref={(input) => { this.nameInput = input;  if (input !== null) {input.focus();}}}  type="text" onChange={this.handleChange} placeholder={this.props.config.placeholder} value={this.props.parent.getCurrentValue()}/>
        </div>

        <Error error={this.props.parent.getError()} />
        </div>;
    }

    renderConfirmation() {
        const step = Object.assign({}, this.props.config);

        step.title='Confirmation code';
        step.placeholder = '1111';
        step.description = (window.constantsOn ? "FRONTFORM_WE_HAVE_SENT_CONFCODE_TO" : window.constants["FRONTFORM_WE_HAVE_SENT_CONFCODE_TO"]) + this.props.parent.getCurrentValue().replace('unconfirmed-', '');

        return <div className="form__main">

        <FormTitle step={step}/>

        <div className="form__group">
            <input ref={(input) => { this.nameInput = input;  if (input !== null) {input.focus();}}}  type="text" onChange={this.handleChangeConfirmationCode} placeholder={step.placeholder} value={this.confirmationCode}/>
        </div>
        <br/>
        <a href="#" style={{'textDecoration': 'none', 'color': 'green'}} onClick={this.changePhoneNumber}>{window.constantsOn ? "FRONTFORM_CHANGE_NUMBER" : window.constants["FRONTFORM_CHANGE_NUMBER"]}</a>


        <Error error={this.props.parent.getError()} />
        </div>;
    }



    confirmationNeeded() {
        return this.props.parent.getCurrentValue().includes('unconfirmed-');
    }
}
export default PhoneNumber;