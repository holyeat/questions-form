import React from 'react'
import Questions from '../containers/Questions';
import reducer from '../reducers/reducer';
import { createStore } from 'redux';


class App extends React.Component {
    initialState = {};

    constructor(props)
    {
        super(props);

        this.state = createStore(reducer);
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
