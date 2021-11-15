import React from 'react';

class FormTitle extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        let tip;
        if (this.props.step.type === 'numeric') {
            tip = window.constantsOn ? "FRONTFORM_TIP" : window.constants["FRONTFORM_TIP"];
        }
        if (typeof this.props.step.description !== 'undefinded') {
            tip = this.props.step.description;
        } 

        return <div>
            <div className="form__main-text">
            <ul>
                {this.props.step.required ? <li><span>*</span> - {window.constantsOn ? "FRONTFORM_REQUIRED" : window.constants["FRONTFORM_REQUIRED"]}</li> : ''}
            </ul>
        </div>
            <div className="form__main-title">
            <h2>{this.props.step.title}
            <span style={this.props.step.required ? {} : {'fontSize': '10px'}}>{this.props.step.required ? '*' : (window.constantsOn ? "FRONTFORM_OPTIONAL" : window.constants["FRONTFORM_OPTIONAL"])}</span>
            <div style={{'fontSize': '12px', 'color': "#CCC", 'lineHeight':'20px'}}>{tip}</div>
            </h2>
        </div>
        </div>;
    }
}
export default FormTitle;