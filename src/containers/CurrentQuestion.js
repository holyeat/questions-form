import React from 'react';
import TextElement from '../elements/TextElement';

class CurrentQuestion extends React.Component {
    constructor(props)
    {
        super(props);
    }

    render(params) {
        let currentStep = this.props.step;
        let contents;
        console.log(this.props.step);
        console.log(currentStep.type);
        switch(currentStep.type) {
            case 'input': 
                contents = <TextElement config={currentStep}/>
        }
console.log(contents);

        return <div>
            {contents}
        </div>
    }
}

export default CurrentQuestion;