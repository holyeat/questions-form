import React from 'react'

class Numeric extends React.Component
{
    constructor(props)
    {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.increment = this.increment.bind(this);
        this.decrement = this.decrement.bind(this);

        let currentValue = this.props.parent.getCurrentValue() > 0 ? this.props.parent.getCurrentValue() : 0;
        this.props.parent.dispatch({'type':'changeCurrentValue' , 'currentValue': currentValue});
        this.forceUpdate();
    }

    handleChange(event)
    {
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
        <div className="form__main-title">
        <h2>{this.props.config.title}<span>*</span></h2>
    </div>

        <div className="form__group form__group--calc">
        <button className="form__btn-calc"onClick={this.decrement}  type="button">-</button>
        <input className="form__input-calc" type="text" onChange={this.handleChange} value={this.props.parent.getCurrentValue()}/>
        <button className="form__btn-calc" onClick={this.increment} type="button">+</button>
     </div></div>;
    }

}
export default Numeric;