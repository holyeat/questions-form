import React from 'react'

class TextElement extends React.Component
{ 
    constructor(props)
    {
        super(props);
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
            <input type="text" placeholder={this.props.config.placeholder}/>
        </div>
    </div>

    }
}
export default TextElement;