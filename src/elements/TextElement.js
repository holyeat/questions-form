import React from 'react'
import Error from '../containers/Error';
import FormTitle from '../containers/FormTitle';

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
        <FormTitle step={this.props.config}/>

        <div className="form__group">
            <input ref={(input) => { this.nameInput = input;  if (input !== null) {input.focus();}}}  type="text" onChange={this.handleChange} placeholder={this.props.config.placeholder} value={this.props.parent.getCurrentValue()}/>
        </div>

        <Error error={this.props.parent.getError()} />
    </div>

    }
}
export default TextElement;