import React, { Component } from 'react';

import twitterLogo from '../twitter.svg';
import './Login.css';

export default class Login extends Component {

    state = { 
        username: '', 
    };

    handleInputChange = (event) => {
        this.setState({ username: event.target.value });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        //Destructor
        const { username } = this.state;
        if (!username.length) return;
        localStorage.setItem("@GoTwitter:username", username);
        //Indica ao react-router-dom que deve haver navegacao para a rota /timeline
        this.props.history.push('/timeline');
    }

    render() {
        return (
            <div className="login-wrapper">
                <img src={twitterLogo} alt="GoTwitter" />
                <form onSubmit={this.handleSubmit}>
                    <input 
                        placeholder="Nome de usuário" 
                        value={this.state.username} 
                        onChange={this.handleInputChange}/>
                    <button type="submit">Entrar</button>
                </form>
            </div>
        );
    }
}
