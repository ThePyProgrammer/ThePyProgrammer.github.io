console.log("Hello, world!")

import React, { Component } from 'react';
import { render } from 'react-dom';
// import Hello from './components/Hello';
class App extends Component {
    render() {
        return (
            <div>
                <h1>Hello</h1>
                <Hello />
            </div>
        )
    }
}
// render(<App />, document.getElementById('root'));