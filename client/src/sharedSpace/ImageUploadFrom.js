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
        fetch('/explorpage/',{
            method: 'POST',
            body:JSON.stringify(payload),
            headers:{
                'Content-Type':'application/json'
            }
         })
        .then(res=>{return res.json()})
        console.log('handlesumit',this.state)
        this.setState({editPost:false});
    }
    render(){
        return(
            <div className=''>
                <button id='upload' onClick={this.handleShow}> share your thoughts </button>
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
                                    Save Changes
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