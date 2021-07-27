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
        this.state.subscribe(() => {
            this.forceUpdate();
        });

        getRemoteState('form', window.userId).then(
            response => {
                if (typeof response.data === 'undefined') {
                    this.state.dispatch({type: 'ready'});
                    this.forceUpdate();
                    return ;
                }

                this.state.dispatch({type: 'reload', 'state': response.data.attributes.state})
                this.forceUpdate();
            }
        );

    }

    render() {
        if (!this.state.getState().isLoaded) {
            return             <div className="wait-spinner">
            <div className="lds-roller">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
;
        }


        return (
            <div>
                <Questions state={this.state} parent={this}/>
          </div>        
        );
    }
}


export default App
