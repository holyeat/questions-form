import React from 'react';

class FormHeader extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        return <div className="form__header">
        <div className="form__header-title">
            <h3>Step {this.props.step.sectionNumber}:<span>{this.props.step.section}</span></h3>
        </div>
        <div className="form__header-line"></div>
        <div className="form__header-bottom">
            <a className="form__arrow active" href="#">back</a>
            <div className="from__header-number"><span>1</span>/38</div>
        </div>
    </div>;
    }
}
export default FormHeader;
