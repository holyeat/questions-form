import React from 'react'

class TextElement extends React.Component
{ 
    constructor(props)
    {
        super(props);
    }

    render()
    {
        return                 <div class="form__main"> <div class="form__main-text">
            <ul>
                <li><span>*</span> - Required</li>
            </ul>
        </div>
        <div class="form__main-title">
            <h2>1.Choose your title (Mr, Ms, Mrs, Dr, Sir…)</h2>
        </div>
        <div class="form__group">
            <input type="text" placeholder="Mrs or Mr, Dr, etc"/>
        </div>
    </div>

    }
}
export default TextElement;