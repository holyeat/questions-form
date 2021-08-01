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
            tip = 'Tip: lick on the number to edit manually';
        }
        if (typeof this.props.step.description !== 'undefinded') {
            tip = this.props.step.description;
        } 

        return <div className="form__main-title">
            <h2>{this.props.step.title}
            <span style={this.props.step.required ? {'lineHeight': '20px'} : {'fontSize': '10px', 'lineHeight': '20px'}}>{this.props.step.required ? '*' : '(optional)'}</span>
            <div style={{'fontSize': '12px', 'color': "#CCC"}}>{tip}</div>
            </h2>
        </div>;
    }
}
export default FormTitle;