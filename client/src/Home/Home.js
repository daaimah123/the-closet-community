import React, { Component } from 'react';

class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      quote:[]
    }
  }
  login() {
    this.props.auth.login();
  }
  randomNumber=()=>{
    return Math.floor((Math.random()*9)+1);
  }
  
  componentDidMount(){
    let number = this.randomNumber();
    this.setNumber(number);
  }
  setNumber=(num)=>{
   return fetch(`/quotes/${num}`)
        .then(res=>{return res.json()}).then(results =>{
          console.log('this is the quotes',results)
          this.setState({
            quote: results
          });
        }).catch(err =>console.log(err));
    
  }

  
  render() {
    const { isAuthenticated } = this.props.auth;
    const {quote} = this.state;
    return (
      <div id='homepage'className="container">
        {
          isAuthenticated() && (
              <p>
                {quote.qoutes}<br/>-{quote.creater}
              </p>
            )
        }
        {
          !isAuthenticated() && (
            
            
             <h4>
               <div>{quote.qoutes}<br/>-{quote.creater}</div>
               
                You are not logged in! Please{' '}
               
                <a
                  style={{ cursor: 'pointer' }}
                  onClick={this.login.bind(this)}
                >
                  Log In
                </a>
                {' '}to continue.
              </h4>
            )
        }
      </div>
    );
  }
}

export default Home;
