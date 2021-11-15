import React from 'react';

class FormHeader extends React.Component
{
    constructor(props)
    {
        super(props);
        this.once = false;
    }

    previousStep(event)
    {
        event.preventDefault();
        this.props.parent.previousStep();

        return false;
    }

    render()
    {
        console.log(this.props.step);

        let percent = ((this.props.step.questionNumber/this.props.step.total) * 100);
        if (this.props.step.questionNumber === 1) {
            percent = 0;
        }

        return <div className="form__header" ref={(input) => { this.nameInput = input;  if (input !== null && this.props.parent.isScrollHeader()) {input.scrollIntoView();}}}>
        <div className="form__header-title">
            <h3>{window.constantOn ? "FRONTFORM_STEP" : window.constants["FRONTFORM_STEP"]} {this.props.step.sectionNumber}:<span>{this.props.step.section}</span>
            
            </h3>
        </div>


        <style dangerouslySetInnerHTML={{
  __html: [
     '.form__header-line:before {',
     '  width: ' + percent + '%',
     '}'
    ].join('\n')
  }}>
</style>

        <div className="form__header-line"></div>
        <div className="form__header-bottom">
            <a className="form__arrow active" href="#" onClick={this.previousStep.bind(this)}>{window.constantsOn ? "FRONTFORM_BACK" : window.constants["FRONTFORM_BACK"]}</a>
            <div className="from__header-number"><span>{this.props.step.questionNumber}</span>/{this.props.step.total}</div>
        </div>
    </div>;
    }
}
export default FormHeader;
