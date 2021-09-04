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

    render()
    {
        return                 <div  className="form__footer">

        <a className="form__footer-text clear-all" onClick={this.clearForm.bind(this)} href="#" style={{'color': 'red'}}>Clear all answers</a>
        <a className="form__btn" onClick={this.submit.bind(this)}>Next</a>
        </div>;
    }
}
export default FormFooter;