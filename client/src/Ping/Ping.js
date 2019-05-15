import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { API_URL } from './../constants';
import axios from 'axios';

class Ping extends Component {
  componentWillMount() {
    this.setState({ message: '' });
  }
  ping() {
    axios.get(`${API_URL}/public`)
      .then(response => this.setState({ message: response.data.message }))
      .catch(error => this.setState({ message: error.message }));
  }
  securedPing() {
    const { getAccessToken, getProfile } = this.props.auth;
    console.log(`this is the token: ${getAccessToken()}`)
    getProfile((err,profile)=>{
      if(err){
        console.log(err)
      }else(
        console.log(profile)
      )
    })
    const headers = { 'Authorization': `Bearer ${getAccessToken()}`}
    axios.get(`${API_URL}/private`, { headers })
      .then(response => this.setState({ message: response.data.message }))
      .catch(error => this.setState({ message: error.message }));
  }
  securedPost(){
    const { getAccessToken, getProfile } = this.props.auth;
    console.log(`this is the token: ${getAccessToken()}`)
    const headers = { 'Authorization': `Bearer ${getAccessToken()}`,'Content-Type':'application/json'}
    getProfile((err,profile)=>{
      if(err){
        return console.log(err)
      }else{
        let sub = profile.sub.split('|');
        let type = sub[0]
        let auth0Id = sub[1]
        
        let user = {
          email:profile.email,
          name: profile.name,
          auth0:auth0Id,
          authType:type
        }
        axios({
          method:'post',
          url:'/user',
          headers,
          data:user
        })
      }
    })
    
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    const { message } = this.state;
    return (
      <div className="container">
        <h1>Make a Call to the Server</h1>
        {
          !isAuthenticated() &&
            <p>Log in to call a private (secured) server endpoint.</p>
        }
        <Button bsStyle="primary" onClick={this.ping.bind(this)}>Ping</Button>
        {' '}
        {
          isAuthenticated() && (
            <div>
              <Button bsStyle="primary" onClick={this.securedPing.bind(this)}>
                Call Private
              </Button>
               <Button bsStyle="primary" onClick={this.securedPost.bind(this)}>
               post to database
             </Button>
            </div>
            )
        }
        <h2>{message}</h2>
      </div>
    );
  }
}

export default Ping;
