import React from 'react';
import Error from '../containers/Error';
import FormTitle from '../containers/FormTitle';

class SingleChoice extends React.Component
{ 
    constructor(props)
    {
        super(props);
        this.handleChange=this.handleChange.bind(this);

        this.forceUpdate();
    }

    loadCurrentValue()
    {
        const variants = this.props.config.variants;
        let currentValue = this.props.parent.getCurrentValue();
        if (currentValue !== null && currentValue.length > 0) {
            this.props.config.variants = this.props.config.variants.reduce(function (acc, value) {
                value.checked = (currentValue === value.value);
                value.showMyVariant = false;

                console.log(value, currentValue);
                if (value.title !== undefined) {
                    value.showMyVariant = currentValue === value.value;
                }
    
                acc.push(value);
                return acc;
            }, []);
        }

    }

    handleOnClick(variant)
    {
        if (variant.value !== null && !variant.custom) {
            this.props.parent.dispatch({ type: 'changeCurrentValue', 'currentValue': variant.value});
            this.props.parent.dispatch({ type: 'nextStep', 'step': this.props.config, value: variant.value});
            return ;
        }

        const variants = this.props.config.variants;
        this.props.config.variants = this.props.config.variants.reduce( (acc, value) => {

            if (value.showMyVariant) {
                value.value = '';
                value.showMyVariant = false;
                acc.push(value);
                return acc;
            }

            if (value.title === variant.title && !variant.showMyVariant && variant.custom) {
                value.checked = true;
                value.showMyVariant = true;
                value.value = '';
                acc.push(value);
                this.props.parent.dispatch({ type: 'changeCurrentValue', 'currentValue': ''});
                return acc;
            }
            value.checked = variant.value === value.value;

            acc.push(value);
            return acc;
        }, []);

        this.forceUpdate();
    }

    handleChange(event)
    {
        this.props.config.variants = this.props.config.variants.reduce(function (acc, value) {
            if (value.title!== undefined) {
                value.value = event.target.value;
            }

            acc.push(value);
            return acc;
        }, []);
        this.props.parent.dispatch({'type':'changeCurrentValue' , 'currentValue': event.target.value});
        this.forceUpdate();
    }

    render()
    {
        this.loadCurrentValue();
        let i = 0;

        return                 <div className="form__main">
        <FormTitle step={this.props.config}/>
        <div className="form__group">
                    
                       { this.props.config.variants.map((variant) => {
                           i ++;
                           console.log(variant.showMyVariant !== undefined && variant.showMyVariant !== false, variant.checked);
                            return <div className="from__group-radio">
                                <input checked={variant.checked ?? false} type="radio" value={variant.value} name={variant.title} id={i + 't'}/>
                                <label onClick={() => this.handleOnClick(variant)} htmlFor={i + 't'}>{variant.custom !== undefined ? variant.title : variant.value}</label>
                        

                                <input onChange={this.handleChange} value={this.props.parent.getCurrentValue() ?? ''} style={(variant.showMyVariant !== undefined && variant.showMyVariant !== false) ? {"display":'block'} : {'display': 'none'}} type="text" placeholder="My variant"/>

                            </div>
                        })}
                    

        </div>

        <Error error={this.props.parent.getError()} />

    </div>

    }
}
export default SingleChoice;