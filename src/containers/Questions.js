import React from 'react';
import CurrentQuestion from '../containers/CurrentQuestion';
import FormHeader from '../containers/FormHeader';
import FormFooter from '../containers/FormFooter';

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
            <FormFooter step={currentStep} parent={this}/>
        </div>
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