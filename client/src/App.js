import React, { Component } from 'react';
import { Navbar, Button } from 'react-bootstrap';
import './App.css';

class App extends Component {
 
  goTo(route) {
    this.props.history.replace(`/${route}`)
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  componentDidMount() {
    const { renewSession } = this.props.auth;

    if (localStorage.getItem('isLoggedIn') === 'true') {
      renewSession();
    }
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <div>
        <Navbar fluid>
          <Navbar.Header>
            <Navbar.Brand>
              <a id='title' href="#">The Closeted</a>
            </Navbar.Brand>
            <div className='navbarButton'>
            <Button
              bsStyle="primary"
              className="btn-margin"
              onClick={this.goTo.bind(this, 'home')}
            >
              Home
            </Button>
            {
              !isAuthenticated() && (
                  <Button
                    id="qsLoginBtn"
                    bsStyle="primary"
                    className="btn-margin"
                    onClick={this.login.bind(this)}
                  >
                    login In
                  </Button>
                )
            }
            {/* {
              isAuthenticated() && (
                  <Button
                    bsStyle="primary"
                    className="btn-margin"
                    onClick={this.goTo.bind(this, 'profile')}
                  >
                    Profile
                  </Button>
                )
            } */}
            {/* {
              isAuthenticated() && (
                  <Button
                    bsStyle="primary"
                    className="btn-margin"
                    onClick={this.goTo.bind(this, 'ping')}
                  >
                    Ping
                  </Button>
                )
            } */}
            {
              isAuthenticated() && (
                  <Button
                    
                    bsStyle="primary"
                    className="btn-margin"
                    onClick={this.goTo.bind(this, 'Mydiary')}
                  >
                    My Diary
                  </Button>
                )
            }
             {
              isAuthenticated() && (
                  <Button
                    bsStyle="primary"
                    className="btn-margin"
                    onClick={this.goTo.bind(this, 'ExplorPage')}
                  >
                    Explore Page
                  </Button>
                )
            }
            {
              isAuthenticated() && (
                  <Button
                    
                    bsStyle="primary"
                    className="btn-margin"
                    onClick={this.goTo.bind(this, 'messager')}
                  >
                    Messager
                  </Button>
                )
            }
            {
              isAuthenticated() && (
                  <Button
                    id="qsLogoutBtn"
                    bsStyle="primary"
                    className="btn-margin"
                    onClick={this.logout.bind(this)}
                  >
                    Log Out
                  </Button>
                )
            }
            </div>
          </Navbar.Header>
        </Navbar>
      </div>
    );
  }
}

export default App;
