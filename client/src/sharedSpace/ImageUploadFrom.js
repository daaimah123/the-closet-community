import React, {Component} from 'react';
import {Modal, Button}from 'react-bootstrap';
class ImageUploaderForm extends Component{
    constructor(prop){
        super(prop)
        this.state={
            url:'',
            editPost:false,
            caption:'',
            authid:this.props.authId

           
            
        }
    }

    handleShow = () => {
        this.setState({editPost:true})
    }
    handleClose = () =>{
        this.setState({editPost:false});
    }

    handlechangeUrl =(event)=>{
        // console.log('i am here')
        this.setState({url:event.target.value})

    }
    handlechangeCaption =(event)=>{
        // console.log('i am here')
        this.setState({caption:event.target.value})

    }
    handleSumit=(event)=>{
        event.preventDefault()
        let payload = {
            authid: this.state.authid,
            url: this.state.url,
            cation: this.state.caption
        }
        console.log('this is the payload',payload)
        fetch('/explorpage/',{
            method: 'POST',
            body:JSON.stringify(payload),
            headers:{
                'Content-Type':'application/json'
            }
         })
        .then(res=>{return res.json()}).then(()=>{
            this.setState({editPost:false});
            this.handleClose();
        })
        console.log('handlesumit',this.state)
        this.setState({editPost:false});
        // this.handleClose
       
    }
    render(){
        return(
            <div className='addButton'>
            <p>Share what you like</p>
                <button id='upload' onClick={this.handleShow}> + here</button>
                <Modal show={this.state.editPost} onHide={this.state.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Body>
                            <div>
                                
                                <form className = 'ImageUploaderForm'>
                                <input placeholder='url' onChange={this.handlechangeUrl}/>
                                <input  placeholder = 'caption' onChange={this.handlechangeCaption}/>
                                {/* <button onClick = {this.handleSumit} > summit </button> */}
                                </form>
                                <Button variant="secondary" onClick={this.handleClose}>
                                Cancel
                                </Button>
                                <Button variant="primary" onClick={this.handleSumit}>
                                    share to all
                                </Button>
                            </div>
                            </Modal.Body>
                    </Modal.Header>
                </Modal>
            </div>
        )
    }
}
export default ImageUploaderForm;