import React from 'react';

class Error extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        if (this.props.error.length < 1) {
            return <div></div>;
        }

        return <div className="form__text-error active"><span>!</span>{this.props.error}</div>        ;
    }
}
export default Error;