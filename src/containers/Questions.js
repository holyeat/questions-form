import React from 'react';
import CurrentQuestion from '../containers/CurrentQuestion';
import FormHeader from '../containers/FormHeader';
import FormFooter from '../containers/FormFooter';
import clearForm from '../middleware/clearForm';
import sendSms from '../middleware/sendSms';
import checkSms from '../middleware/checkSms';

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


    render(params) {
        const store = this.props.state;
        // store.subscribe(() => {
        //     this.forceUpdate();
        // });


        let questionsList = window.config;
        let currentStep = this.props.state.getState().steps[this.props.state.getState().currentStep];
        this.currentStep = currentStep;
        console.log(currentStep);


        return <form className="form"  onSubmit={this.onFormSubmit.bind(this)}>
            <FormHeader step={currentStep} parent={this}/>
            <CurrentQuestion state={this.props.state} step={currentStep}/>
            <FormFooter step={currentStep} parent={this} state={this.props.state}/>
            <a href={window.config.nextStepUrl} className="form__footer-text" style={{'maxWidth': "120px"}}>Fill the form later</a>

        </form>
    }

    clearForm()
    {
        this.props.state.dispatch({'type': 'load'});
        this.forceUpdate();
        clearForm('form', window.userId).then(() =>  {
            this.props.state.dispatch({'type': 'clear'});
            this.forceUpdate();
        });
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
        this.props.state.dispatch({ type: 'previousStep' });
    }

    submit(value)
    {
        let number = this.currentValue();
        if (this.currentStep.type === 'phone_number' && !number.includes('unconfirmed-')) {

            if (this.props.state.getState().verifiedNumbers.includes(number)) {
                this.props.state.dispatch({ type: 'changeCurrentValue', currentValue: number});
                this.props.state.dispatch({ type: 'nextStep', value: number});
                this.forceUpdate();
                return ;
            }

            sendSms(value);
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
                        this.props.state.dispatch({'type': 'error', 'error': 'Incorrect confirmation code'});
                    }
                }
            );
            return ;
        }

        this.props.state.dispatch({ type: 'nextStep', 'step': this.currentStep, 'value': value});
    }
}

export default Questions;