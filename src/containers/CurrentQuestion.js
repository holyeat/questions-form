import React from 'react';
import SingleChoice from '../elements/SingleChoice';
import TextElement from '../elements/TextElement';

class CurrentQuestion extends React.Component {
    constructor(props)
    {
        super(props);
    }

    render(params) {
        let currentStep = this.props.step;
        let contents;

        switch(currentStep.type) {
            case 'input': 
                contents = <TextElement config={currentStep}/>
                break;
            case 'single-choice': 
                contents = <SingleChoice config={currentStep}/>
                break;
            default:    
        }

        return <div>
            {contents}
        </div>
    }
}

export default CurrentQuestion;