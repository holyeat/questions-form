import React from 'react'
import Error from '../containers/Error';
import FormTitle from '../containers/FormTitle';

class MultiChoice extends React.Component
{ 
    myVariant;

    constructor(props)
    {
        super(props);
        this.handleChange=this.handleChange.bind(this);

    }

    handleChange(event)
    {
        this.props.config.variants = this.props.config.variants.reduce(function (acc, value) {
            if (value.title !== undefined && value.custom) {
                value.value = event.target.value;
            }
            acc.push(value);
            return acc;
        }, []);
        this.forceUpdate();
    }


    handleOnClick(variant)
    {
        let currentValue = [];

        this.props.config.variants = this.props.config.variants.reduce((acc, value) => {
            if (variant.value === value.value && value.checked) {
                if (variant.custom) {
                    this.myVariant = '';
                    variant.showMyVariant = false;
                }

                value.checked=0;
                acc.push(value);
                return acc;
            }

            if (value.checked) {
                currentValue.push(value.value);
            }

            if (variant.value === value.value) {
                value.checked=1;
                if(value.custom !== undefined && value.custom && variant.custom && value.checked) {
                    value.showMyVariant = true;
                }

                currentValue.push(value.value);
                acc.push(value);
                return acc;
            }


            acc.push(value);
            return acc;
        }, []);


        console.log(currentValue);
        this.props.parent.dispatch({'type':'changeCurrentValue' , 'currentValue': currentValue});
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

        <FormTitle step={this.props.config}/>


        <div className="form__group">
                
                    
                       { this.props.config.variants.map((variant) => {
                            return <div className="from__group-radio">
                                <input  checked={variant.checked}  type="checkbox" value={variant.value} name={variant.title} id={variant.value}/>
                                <label onClick={() => this.handleOnClick(variant)} htmlFor={variant.title}>{variant.custom !== undefined ? variant.title : variant.value}</label>
                                <input onChange={this.handleChange} value={variant.value ?? ''} style={(variant.showMyVariant !== undefined && variant.showMyVariant !== false) ? {"display":'block'} : {'display': 'none'}} type="text" placeholder="My variant"/>

                        
                            </div>
                        })}
                    
                </div>
                <Error error={this.props.parent.getError()} />

    </div>

    }
}
export default MultiChoice;