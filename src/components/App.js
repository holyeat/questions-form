import React from 'react'
import Questions from '../containers/Questions';
import reducer from '../reducers/reducer';
import { createStore } from 'redux';
import getRemoteState from '../middleware/getRemoteState';



class App extends React.Component {
    initialState = {};

    constructor(props)
    {
        super(props);
        this.state = createStore(reducer);

        getRemoteState('form', window.userId).then(
            response => this.state.dispatch({type: 'reload', 'state': response.data.attributes.state})
        );

    }

    render() {
        return (
            <div>
                <Questions state={this.state} parent={this}/>
          </div>        
        );
    }
}


export default App
