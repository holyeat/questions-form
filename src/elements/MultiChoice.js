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
        let currentValue = this.props.config.variants.reduce((acc, variant) => {
            if (variant.checked) {
                acc.push(variant.value);
            }
            return acc;
        }, []);

        this.props.config.variants = this.props.config.variants.reduce(function (acc, value) {
            if (value.title !== undefined && value.custom) {
                value.value = event.target.value;
                value.checked = true;
            }
            acc.push(value);
            return acc;
        }, []);    
        
        currentValue.push(event.target.value);
        this.props.parent.dispatch({'type':'changeCurrentValue' , 'currentValue': currentValue});

        this.syncWithState();

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


        this.props.parent.dispatch({'type':'changeCurrentValue' , 'currentValue': currentValue});
        this.forceUpdate();
    }


    syncWithState() {
        const currentValue = this.props.parent.getCurrentValue();
        this.props.config.variants = this.props.config.variants.reduce((acc, variant) => {
            variant.checked = currentValue.includes(variant.value);
            acc.push(variant);
            return acc;
        }, []);
    }

    render()
    {
        this.syncWithState();

        return                 <div className="form__main"> 

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