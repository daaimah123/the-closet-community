import React from 'react'
class SendMessageForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            text:'',
        }
        
    } 
    onChange = (e) =>{
        this.setState({
            text: e.target.value
        })
    }
    onSubmit = (e) =>{
        e.preventDefault()
        this.props.onSubmit(this.state.text)
    }
    render(){
        return(
            <div>
                <form onSubmit={this.onSubmit}>
                    <input 
                        type='text'
                        placeholder='add to the conversation'
                        onChange={this.onChange}
                        value={this.state.message}
                    />
                    <input type='submit'/>
                </form>
            </div>
        )
    }
}
export default SendMessageForm;