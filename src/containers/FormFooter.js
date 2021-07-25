import React from 'react';

class FormFooter extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    submit()
    {
        this.props.parent.submit(this.props.parent.value);
    }

    render()
    {
        return                 <div className="form__footer">
        <a className="form__footer-text" href="#">Fill the form later</a>
        <a className="form__btn" onClick={this.submit.bind(this)}>Next</a>
        </div>;
    }
}
export default FormFooter;