import React from 'react';
import CurrentQuestion from '../containers/CurrentQuestion';


class Questions extends React.Component {

    constructor(props)
    {
        super(props);
    }

    render(params) {
        let questionsList = window.config;
        let currentStep = this.props.state.getState().steps[this.props.state.getState().currentStep];

        
        return <div>
            <CurrentQuestion state={this.props.state} step={currentStep}/>
        </div>
    }
}

export default Questions;