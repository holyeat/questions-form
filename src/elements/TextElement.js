import React from 'react'

class TextElement extends React.Component
{ 
    constructor(props)
    {
        super(props);
        this.handleChange=this.handleChange.bind(this);
    }

    handleChange(event)
    {
        this.props.parent.dispatch({'type':'changeCurrentValue' , 'currentValue': event.target.value});
        this.forceUpdate();
    }

    render()
    {
        return                 <div className="form__main"> <div className="form__main-text">
            <ul>
                <li><span>*</span> - Required</li>
            </ul>
        </div>
        <div className="form__main-title">
            <h2>{this.props.config.title}</h2>
        </div>
        <div className="form__group">
            <input type="text" onChange={this.handleChange} placeholder={this.props.config.placeholder} value={this.props.parent.getCurrentValue()}/>
        </div>
    </div>

    }
}
export default TextElement;