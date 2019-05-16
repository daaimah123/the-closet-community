import React, {Component } from 'react'
import ChatScreen from './ChatScreen'
class ChatkitSignUps extends React.Component {
    constructor(props){
        super()
        this.state = {
            username: '',
            currentScreen: 'whatIsYourUsernameScreen',
            currentUsername:''
        }
      }
    componentWillMount(){
       
        const { userProfile, getProfile} = this.props.auth;

        if (!userProfile) {
        getProfile((err, profile) => {
            let sub = profile.sub.split("|");
            let id = sub[1]
            console.log('this is the id:', id)
            this.sendUser(id)
            this.setState({
                profile: profile,
                username: id,
                name: profile.name,
                email: profile.email
            })
        });
        } else {
            let sub = userProfile.sub.split("|");
            let id = sub[1]
            console.log(id)
            this.sendUser(id)
        this.setState({
                profile: userProfile,
                username: id,
                name: userProfile.name,
                email: userProfile.email
            });
        
        }
        
    }

    sendUser = () => {
        const {username} = this.state;
        fetch('/users/',{
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify({username})
        }).then(response =>{
            console.log('success')
            this.setState({
                currentUsername:username,
                currentScreen:'ChatScreen'
            })
        })
        .catch(error=>{
            console.error(error)
        })
    }
    render(){
        const {currentScreen, username,currentUsername} = this.state;
        if(currentScreen === 'whatIsYourUsernameScreen'){
            return (
                <div>
                    <h1>something went really wrong</h1>
                </div>
            )
        }else if (currentScreen === 'ChatScreen'){
            return <ChatScreen currentUsername={currentUsername} />
        }
      
    }

}
export default ChatkitSignUps;