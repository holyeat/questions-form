import React from 'react'

class Numeric extends React.Component
{
    render()
    {
        return        <div>        
        <div className="form__main-title">
        <h2>{this.props.config.title}<span>*</span></h2>
    </div>

        <div className="form__group form__group--calc">
        <button className="form__btn-calc" type="button">-</button>
        <input className="form__input-calc" type="text" value="0"/>
        <button className="form__btn-calc" type="button">+</button>
     </div></div>;
    }

}
export default Numeric;