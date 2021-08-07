import React from 'react';
import Error from '../containers/Error';
import FormTitle from '../containers/FormTitle';


class Numeric extends React.Component
{
    constructor(props)
    {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.increment = this.increment.bind(this);
        this.decrement = this.decrement.bind(this);

    }

    // componentDidMount(){
    //     this.nameInput.focus();
    // }

    handleChange(event)
    {
        if (this.props.parent.getCurrentValue() === 0) {
            event.target.value = event.target.value.replace('0', '');
        }
        this.props.parent.dispatch({'type':'changeCurrentValue' , 'currentValue': event.target.value});
        this.forceUpdate();
    }

    increment()
    {
        this.props.parent.dispatch({'type':'changeCurrentValue' , 'currentValue': this.props.parent.getCurrentValue() + 1});
        this.forceUpdate();
    }

    decrement()
    {
        let value = this.props.parent.getCurrentValue();
        if (value <= 0) {
            return;
        }

        this.props.parent.dispatch({'type':'changeCurrentValue' , 'currentValue': value - 1});
        this.forceUpdate();
    }

    render()
    {
        return        <div>    
            
            <FormTitle step={this.props.config}/>
                    <div className="form__group form__group--calc">
        <button className="form__btn-calc"onClick={this.decrement}  type="button">-</button>
        <input  ref={(input) => { this.nameInput = input;  if (input !== null) {input.focus();}}}  className="form__input-calc" type="text" onChange={this.handleChange} value={this.props.parent.getCurrentValue()}/>
        <button className="form__btn-calc" onClick={this.increment} type="button">+</button>
     </div>
     
     <Error error={this.props.parent.getError()} />

     
     </div>;
    }

}
export default Numeric;