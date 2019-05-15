import auth0 from 'auth0-js';
import { AUTH_CONFIG } from './auth0-variables';
import history from '../history';
import axios from 'axios';

export default class Auth {
  accessToken;
  idToken;
  expiresAt;
  userProfile;

    auth0 = new auth0.WebAuth({
      domain: AUTH_CONFIG.domain,
      clientID: AUTH_CONFIG.clientID,
      redirectUri: AUTH_CONFIG.callbackUrl,
      audience: AUTH_CONFIG.apiUrl,
      responseType: 'token id_token',
      scope: "openid profile email read:messages"
  });

  // auth0 = new auth0.WebAuth(AUTH_CONFIG);


  constructor() {
    // console.log(AUTH_CONFIG);
    // this.auth0 = new auth0.WebAuth(AUTH_CONFIG);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.getAccessToken = this.getAccessToken.bind(this);
    this.getIdToken = this.getIdToken.bind(this);
    this.renewSession = this.renewSession.bind(this);
    this.getProfile = this.getProfile.bind(this);
  }

  login() {
    this.auth0.authorize() 
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

  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        this.createUser();
      } else if (err) {
        history.replace('/home');
        console.log(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  }
  createUser(){
    // const { getAccessToken, getProfile } = this.props.auth;
    console.log(`this is the token: ${this.getAccessToken()}`)
    const headers = { 'Authorization': `Bearer ${this.getAccessToken()}`,'Content-Type':'application/json'}
   this.getProfile((err,profile)=>{
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
          authtype:type
        }
        console.log('this is the user:',user)
        axios({
          method:'post',
          url:'/user',
          headers,
          data:user
        })
      }
    })
    
  }
  getAuthId=()=>{
    this.getProfile((err,profile)=>{
      if(err) return console.log(err);
      let sub = profile.sub.split("|");
      let auth0Id = sub[1]
      console.log('inside auth0id',auth0Id)
      return auth0Id
    })
  }

  getAccessToken() {
    return this.accessToken;
  }

  getIdToken() {
    return this.idToken;
  }

  setSession(authResult) {
    // Set isLoggedIn flag in localStorage
    localStorage.setItem('isLoggedIn', 'true');

    // Set the time that the access token will expire at
    let expiresAt = (authResult.expiresIn * 1000) + new Date().getTime();
    this.accessToken = authResult.accessToken;
    this.idToken = authResult.idToken;
    this.expiresAt = expiresAt;

    // navigate to the home route
    history.replace('/home');
  }

  renewSession() {
    this.auth0.checkSession({}, (err, authResult) => {
       if (authResult && authResult.accessToken && authResult.idToken) {
         this.setSession(authResult);
       } else if (err) {
         this.logout();
         console.log(err);
         alert(`Could not get a new token (${err.error}: ${err.error_description}).`);
       }
    });
  }

  isAuthenticated() {
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = this.expiresAt;
    return new Date().getTime() < expiresAt;
  }


  logout() {
    // Remove tokens and expiry time
    this.accessToken = null;
    this.idToken = null;
    this.expiresAt = 0;

    // Remove user profile
    this.userProfile = null;

    // Remove isLoggedIn flag from localStorage
    localStorage.removeItem('isLoggedIn');

    // this.auth0.logout({
    //   returnTo: window.location.origin
    // });

    // navigate to the home route
    history.replace('/');
  }

  getProfile(cb) {
    this.auth0.client.userInfo(this.accessToken, (err, profile) => {
      if (profile) {
        this.userProfile = profile;
      }
      cb(err, profile);
    });
  }

}
