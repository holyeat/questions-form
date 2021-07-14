import React from 'react'

class SingleChoice extends React.Component
{ 
    constructor(props)
    {
        super(props);
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
                                <input type="radio" id="male" value={variant.value} name="gender"/>
                                <label for="male">{variant.value === null ? variant.title : variant.value}</label>
                            </div>
                        })}
                    
                </div>

        </div>
    </div>

    }
}
export default SingleChoice;