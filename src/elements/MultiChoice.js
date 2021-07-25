import React from 'react'
import Error from '../containers/Error';

class MultiChoice extends React.Component
{ 
    constructor(props)
    {
        super(props);
    }

    handleOnClick(variant)
    {
        let currentValue = [];
        this.props.config.variants = this.props.config.variants.reduce(function (acc, value) {

            if (variant.value === value.value && value.checked) {
                value.checked=0;
                acc.push(value);
                return acc;
            }

            if (variant.checked) {
                currentValue.push(value.value);
            }

            if (variant.value === value.value && !value.checked) {
                value.checked=1;
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
        <div className="form__main-title">
            <h2>{this.props.config.title}
            <span>{this.props.config.required ? '*' : ''}</span>
            
            </h2>
        </div>
        <div className="form__group">
                
                    
                       { this.props.config.variants.map((variant) => {
                            return <div className="from__group-radio">
                                <input  checked={variant.checked}  type="checkbox" value={variant.value} name={variant.title} id={variant.value}/>
                                <label onClick={() => this.handleOnClick(variant)} htmlFor={variant.value}>{variant.value}</label>
                        
                            </div>
                        })}
                    
                </div>
                <Error error={this.props.parent.getError()} />

    </div>

    }
}
export default MultiChoice;