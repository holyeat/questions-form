import React from 'react';
import CurrentQuestion from '../containers/CurrentQuestion';
import FormHeader from '../containers/FormHeader';
import FormFooter from '../containers/FormFooter';
import clearForm from '../middleware/clearForm';

class Questions extends React.Component {

    currentStep;

    constructor(props)
    {
        super(props);
        this.props.state.subscribe(() => this.props.state.getState());

    }

    render(params) {
        const store = this.props.state;
        store.subscribe(() => {
            this.forceUpdate();
        });
        

        let questionsList = window.config;
        let currentStep = this.props.state.getState().steps[this.props.state.getState().currentStep];
        this.currentStep = currentStep;
        console.log(currentStep);


        return <div className="form" action="/" method="POST">
            <FormHeader step={currentStep} parent={this}/>
            <CurrentQuestion state={this.props.state} step={currentStep}/>
            <FormFooter step={currentStep} parent={this} state={this.props.state}/>
            <a href={window.config.nextStepUrl} className="form__footer-text" style={{'maxWidth': "120px"}}>Fill the form later</a>

        </div>
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

    previousStep()
    {
        this.props.state.dispatch({ type: 'previousStep' });
    }

    submit(value)
    {
        this.props.state.dispatch({ type: 'nextStep', 'step': this.currentStep, value: value});
    }
}

export default Questions;