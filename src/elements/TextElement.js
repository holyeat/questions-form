import React from 'react'
import Error from '../containers/Error';

class TextElement extends React.Component
{ 
    constructor(props)
    {
        super(props);
        this.handleChange=this.handleChange.bind(this);
    }

    componentDidMount(){
        this.nameInput.focus();
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
            <h2>{this.props.config.title}
            <span>{this.props.config.required ? '*' : ''}</span>

            
            </h2>
        </div>
        <div className="form__group">
            <input ref={(input) => { this.nameInput = input; }}  type="text" onChange={this.handleChange} placeholder={this.props.config.placeholder} value={this.props.parent.getCurrentValue()}/>
        </div>

        <Error error={this.props.parent.getError()} />
    </div>

    }
}
export default TextElement;