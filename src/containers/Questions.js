import React from 'react';
import CurrentQuestion from '../containers/CurrentQuestion';
import FormHeader from '../containers/FormHeader';
import FormFooter from '../containers/FormFooter';
import clearForm from '../middleware/clearForm';
import sendSms from '../middleware/sendSms';
import checkSms from '../middleware/checkSms';
import parsePhoneNumber from 'libphonenumber-js'

class Questions extends React.Component {

    currentStep;

    constructor(props)
    {
        super(props);
        const store = this.props.state;
        store.subscribe(() => {
            this.forceUpdate();
        });


    }

    onFormSubmit(event) {
        event.preventDefault();
        this.submit(this.currentValue());
    }


    cancelClean() {
        this.props.state.dispatch({'type': 'cancelClean'});
    }

    confirmClean() {
        this.props.state.dispatch({'type': 'load'});

        clearForm('form', window.userId).then(() =>  {
            this.props.state.dispatch({'type': 'clear-confirm'});
        });
    }

    render(params) {
        const store = this.props.state;
        // store.subscribe(() => {
        //     this.forceUpdate();
        // });


        let questionsList = window.config;
        let currentStep = this.getCurrentStep();
        this.currentStep = currentStep;
        console.log(currentStep);


        if (this.props.state.getState().showClearState) {
            return <form className="form"  style={{'textAlign':'center'}} onSubmit={this.onFormSubmit.bind(this)}>
                <h2>{window.constantsOn ? "FRONTFORM_CONFIRM_CLEARING_ALL_ANSWERS" : window.constants["FRONTFORM_CONFIRM_CLEARING_ALL_ANSWERS"]}</h2>
                <div className="confirm-container">
                    <a href="#" onClick={this.confirmClean.bind(this)} className="form__btn2 form__btn2-red">{window.constantsOn ? "FRONTFORM_CONFIRM" : window.constants["FRONTFORM_CONFIRM"]}</a>
                    <a href="#" onClick={this.cancelClean.bind(this)} className="form__btn2">{window.constantsOn ? "FRONTFORM_CANCEL" : window.constants["FRONTFORM_CANCEL"]}</a>
                </div>

                </form>
        }

        return <form className="form"  onSubmit={this.onFormSubmit.bind(this)}>
            <FormHeader step={currentStep} parent={this}/>
            <CurrentQuestion state={this.props.state} step={currentStep}/>
            <FormFooter step={currentStep} parent={this} state={this.props.state}/>
            <a href={window.config.nextStepUrl} className="form__footer-text" style={{'maxWidth': "120px"}}>{window.constantsOn ? "FRONTFORM_FILL_THE_FORM_LATER" : window.constants["FRONTFORM_FILL_THE_FORM_LATER"]}</a>

        </form>
    }

    getCurrentStep()
    {
        return this.props.state.getState().steps[this.props.state.getState().currentStep];
    }

    clearForm()
    {
        this.forceUpdate();
        this.props.state.dispatch({'type': 'clear'});
    }

    currentValue()
    {
        return this.props.state.getState().currentValue;
    }

    isScrollHeader()
    {
        let scroll = this.props.state.getState().isScrollHeader;
        return scroll !== undefined && scroll;
    }


    previousStep()
    {
        let number = this.currentValue();
        if (this.currentStep.type === 'phone_number' && number.includes('unconfirmed-')) {
            this.props.state.dispatch({'type':'phoneNumberPreviousStep'});
            return ;
        }

        this.props.state.dispatch({ type: 'previousStep' });
    }

    submit(value)
    {
        let number = this.currentValue();
        if (this.currentStep.type === 'phone_number' && !number.includes('unconfirmed-')) {

            let parsedNumber = parsePhoneNumber(number, window.countryCode);
            if (parsedNumber === undefined || !parsedNumber.isValid()) {
                this.props.state.dispatch({ type: 'error', 'error': (window.constantsOn ? "FRONTFORM_INCORRECT_PHONENUMBER" : window.constants["FRONTFORM_INCORRECT_PHONENUMBER"])});
                return ;
            }
            number = parsedNumber.getURI().replace('tel:', '');
            this.props.state.dispatch({ type: 'changeCurrentValue', currentValue: number});

            if (this.props.state.getState().verifiedNumbers.includes(number)) {
                this.props.state.dispatch({ type: 'nextStep', value: number});
                this.forceUpdate();
                return ;
            }


            sendSms(number);
            this.props.state.dispatch({ type: 'phoneNumberSubmit'});
            return ;
        }


        if (this.currentStep.type === 'phone_number' && this.currentValue().includes('unconfirmed-')) {

            this.props.state.dispatch({'type': 'load'});

            checkSms(this.currentValue().replace('unconfirmed-', ''),  this.props.state.getState().confirmationCode).then(
                response =>  {
                    this.props.state.dispatch({'type': 'ready'});
                    let number = this.currentValue().replace('unconfirmed-', '');

                    if (response.confirmed) {
                        let value = this.currentValue().replace('unconfirmed-', '');
                        this.props.state.dispatch({'type': 'changeCurrentValue', currentValue: value});
                        this.props.state.dispatch({'type': 'nextStep', 'value': number});

                        this.props.state.dispatch({ type: 'addVerifiedNumbers', 'verifiedNumber': number});

                    } else {
                        this.props.state.dispatch({'type': 'error', 'error': (window.constantsOn ? "FRONTFORM_INCORRECT_CODE" : window.constants["FRONTFORM_INCORRECT_CODE"])});
                    }
                }
            );
            return ;
        }

        this.props.state.dispatch({ type: 'nextStep', 'step': this.currentStep, 'value': value});
    }
}

export default Questions;