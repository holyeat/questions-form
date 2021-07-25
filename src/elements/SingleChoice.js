import React from 'react'

class SingleChoice extends React.Component
{ 
    constructor(props)
    {
        super(props);
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

        this.props.config.variants = this.props.config.variants.reduce(function (acc, value) {
            if (value.title === variant.title && variant.value === null) {
                variant.showMyVariant = true;
                acc.push(value);
                return acc;
            }

            acc.push(value);
            return acc;
        }, []);
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
                            return <div>
                                <input   type="radio" value={variant.value} name={variant.title} id={variant.title}/>
                                <label onClick={() => this.handleOnClick(variant)} htmlFor={variant.title}>{variant.value === null ? variant.title : variant.value}</label>
                        

                                <input style={variant.showMyVariant !== undefined ? {"display":'block'} : {}} type="text" placeholder="My variant"/>

                            </div>
                        })}
                    
                </div>

        </div>
    </div>

    }
}
export default SingleChoice;