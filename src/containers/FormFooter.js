import React from 'react';

class FormFooter extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    submit(event)
    {
        event.preventDefault();
        this.props.parent.submit(this.props.parent.value);
        return false;
    }

    clearForm(event)
    {
        event.preventDefault();
        this.props.parent.clearForm();
    }

    clearAll()
    {
            return <a className="form__footer-text clear-all" onClick={this.clearForm.bind(this)} href="#" style={{'color': 'red'}}>{window.constants["FRONTFORM_CLEAR_ALL_ANSWERS"]}</a>;
    }

    getButtonName() {
        let currentValue = this.props.parent.currentValue();
        let isRequired = this.getCurrentStep().required;
        if ((currentValue.length < 1 || currentValue == 0) && !isRequired) {
            return window.constants["FRONTFORM_SKIP"];
        }


        return window.constants["FRONTFORM_NEXT"];
    }

    getCurrentStep()
    {
        return this.props.step;
    }

    render()
    {
        return                 <div  className="form__footer">

        {this.clearAll()}
        <a className="form__btn" onClick={this.submit.bind(this)}>{this.getButtonName()}</a>
        </div>;
    }
}
export default FormFooter;