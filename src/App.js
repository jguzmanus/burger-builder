import React, { Component } from 'react';

import './App.css';

const yes = true;

class App extends Component {
    state = { something: false };
    someFunc = (name, lastname) => {
        {
            {
                {
                    return (
                        <h4>
                            This is a header with props Name:
                            {name} LastName: {lastname}
                        </h4>
                    );
                }
            }
        }
    };

    render() {
        const arr = [1, 2, 3, 4];

        return (
            <div className="App">
                {this.someFunc('Jose', 'Guzman')}
                <header className="App-header">
                    <p>
                        Edit <code>src/App.js</code> and save
                        to reload ;lkasd ;lasdk';k sd;lksj
                        asdlkfjs;flkjs kljas d;kljs ;lks
                        fklsjdf
                    </p>
                    <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer">
                        Learn React
                    </a>
                </header>
            </div>
        );
    }
}

export default App;
