import React from 'react';

class FormHeader extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    previousStep()
    {
        return this.props.parent.previousStep();
    }

    render()
    {
        return <div className="form__header">
        <div className="form__header-title">
            <h3>Step {this.props.step.sectionNumber}:<span>{this.props.step.section}</span></h3>
        </div>
        <div className="form__header-line"></div>
        <div className="form__header-bottom">
            <a className="form__arrow active" href="#" onClick={this.previousStep.bind(this)}>back</a>
            <div className="from__header-number"><span>{this.props.step.questionNumber}</span>/{this.props.step.total}</div>
        </div>
    </div>;
    }
}
export default FormHeader;
