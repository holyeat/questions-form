import React from 'react';
import Error from '../containers/Error';

class SingleChoice extends React.Component
{ 
    constructor(props)
    {
        super(props);
        this.handleChange=this.handleChange.bind(this);

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
        this.forceUpdate();
    }

    handleOnClick(variant)
    {
        if (variant.value !== null) {
            console.log(this.props);
            this.props.parent.dispatch({
                'type': 'submitSingleChoice',
                'variant': variant,
                'step': this.props.config,
            });
        }

        const variants = this.props.config.variants;
        this.props.config.variants = this.props.config.variants.reduce(function (acc, value) {
            if (value.title === variant.title && variant.value === null) {
                variant.showMyVariant = !variants.reduce(function(acc, value) {
                    acc.push(value.title);
                    return acc;
                }, []).includes(value.value);

                console.log(variant.showMyVariant);
                acc.push(value);
                return acc;
            }

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

        console.log(this.props.config);
        return                 <div className="form__main"> <div className="form__main-text">
            <ul>
                <li><span>*</span> - Required</li>
            </ul>
        </div>
        <div className="form__main-title">
            <h2>{this.props.config.title}</h2>
        </div>
        <div className="form__group">
                <div className="from__group-radio">
                    
                       { this.props.config.variants.map((variant) => {
                           console.log(variant.showMyVariant !== undefined && variant.showMyVariant !== false);
                            return <div>
                                <input checked={variant.checked}  type="radio" value={variant.value} name={variant.title} id={variant.title}/>
                                <label onClick={() => this.handleOnClick(variant)} htmlFor={variant.title}>{variant.custom !== undefined ? variant.title : variant.value}</label>
                        

                                <input onChange={this.handleChange} value={this.props.parent.getCurrentValue()} style={(variant.showMyVariant !== undefined && variant.showMyVariant !== false) ? {"display":'block'} : {'display': 'none'}} type="text" placeholder="My variant"/>

                            </div>
                        })}
                    
                </div>

        </div>

        <Error error={this.props.parent.getError()} />

    </div>

    }
}
export default SingleChoice;