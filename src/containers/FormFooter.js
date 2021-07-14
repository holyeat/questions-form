import React from 'react';

class FormFooter extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        return                 <div className="form__footer">
        <a className="form__footer-text" href="#">Fill the form later</a>
        <a className="form__btn" href="questionnaire2.html">Next</a>
        </div>;
    }
}
export default FormFooter;