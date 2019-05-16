import React, {Component} from 'react'
import Chatkit from '@pusher/chatkit'
import MessageList from './MessageList'
import SendMessageForm from './SendMessageForm'

class ChatScreen extends Component {
    constructor() {
        super()
        this.state = {
            messages:[],
            currentRoom:{},
            currentUser:{}
        }
    }
    componentDidMount(){
        console.log(process.env.INSTANCE_LOCATOR)
        console.log('this is the username', this.props.currentUsername)
        const chatManager = new Chatkit.ChatManager({
            instanceLocator: 'v1:us1:59afa2c3-15d7-4933-a26a-71a8ce12da18',
            userId:this.props.currentUsername,
            tokenProvider: new Chatkit.TokenProvider({
                url:'/authenticate/'
            }),
        })
        chatManager
        .connect()
        .then(currentUser => {
            this.setState({currentUser})
            return currentUser.subscribeToRoom({
               roomId:9423717,
               messageLimit:100,
               hooks:{
                   onNewMessage: message => {
                       this.setState({
                           messages:[...this.state.messages,message]
                       })
                   }
               }
            })
        }).then(currentRoom =>{
            this.setState({currentRoom})
        })
        .catch(error=> console.error(error))
    }
    sendMessage =(text)=>{
        this.state.currentUser.sendMessage({
            roomId: this.state.currentRoom.id,
            text
        })
    }

    render(){
        return(
            <div>
                Chat
                <MessageList messages={this.state.messages} />
                <SendMessageForm onSubmit={this.sendMessage}/>
            </div>
        )
    }
}
export default ChatScreen;