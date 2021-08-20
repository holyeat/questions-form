import React from 'react';
import SingleChoice from '../elements/SingleChoice';
import TextElement from '../elements/TextElement';
import MultiChoice from '../elements/MultiChoice';
import Numeric from '../elements/Numeric';
import PhoneNumber from '../elements/PhoneNumber';

class CurrentQuestion extends React.Component {
    value;

    constructor(props)
    {
        super(props);
        this.value = '';

        this.props.state.subscribe(() => this.props.state.getState());
        this.state = this.props.state;
    }

    componentDidMount() {
        window.scrollTo(0, 0)
      }
            
    render(params) {
        let currentStep = this.props.step;
        let contents;

        switch(currentStep.type) {
            case 'input': 
                contents = <TextElement config={currentStep} parent={this}/>
                break;
            case 'single-choice': 
                contents = <SingleChoice config={currentStep} parent={this}/>
                break;
            case 'multiple-choice': 
                contents = <MultiChoice config={currentStep} parent={this}/>
                break;    
             case 'numeric': 
                contents = <Numeric config={currentStep} parent={this}/>
                break;
            case 'phone_number': 
                contents = <PhoneNumber config={currentStep} parent={this}/>
                break;        

            default:    
        }

        return <div>
            {contents}
        </div>
    }


    getError()
    {
        return this.props.state.getState().error;
    }


    dispatch(params) {
        this.props.state.dispatch(params);
    }

    getCurrentValue() {
        return this.props.state.getState().currentValue;
    }
}

export default CurrentQuestion;