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
      <div className="container">
        {
          isAuthenticated() && (
              <p id='qoutes'>
                {quote.qoutes}<br/>-{quote.creater}
              </p>
            )
        }
        {
          !isAuthenticated() && (
            
            
             <h4 id='homepage'>
               <div>{quote.qoutes}<br/><br/>-{quote.creater}</div>
               <br/>
              <button className='loginButton'onClick={this.login.bind(this)}>
                  login
                </button>
              </h4>
            )
        }
      </div>
    );
  }
}

export default Home;
