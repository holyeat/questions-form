import React from 'react';
import CurrentQuestion from '../containers/CurrentQuestion';
import FormHeader from '../containers/FormHeader';
import FormFooter from '../containers/FormFooter';

class Questions extends React.Component {

    constructor(props)
    {
        super(props);
    }

    render(params) {
        let questionsList = window.config;
        let currentStep = this.props.state.getState().steps[this.props.state.getState().currentStep];


        return <div className="form" action="/" method="POST">
            <FormHeader step={currentStep}/>
            <CurrentQuestion state={this.props.state} step={currentStep}/>
            <FormFooter step={currentStep}/>
        </div>
    }
}

export default Questions;