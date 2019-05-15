import React, {Component} from 'react';
class Likes extends Component{
	constructor(props){
		super(props)
		this.state = {
			isLiked:false,
			display:'i am not liked',
			number: this.props.likes
		}
	}
	likeNumbers=()=>{
		console.log('am i here')
		const {number,display,isLiked} = this.state;
		this.setState({isLiked: !isLiked});
		if(isLiked===true){
			this.setState({number: number+1})
			this.setState({display:'I am liked'})

		}
		if(!isLiked===true){
			this.setState({display:'I am not liked'})
			if(number > 0){
				this.setState({number: number-1})
			}
			else{
				this.setState({number:0})
			}
		}
		

	}
	render(){
		const {display,number} = this.state;

		return(
			<div className ='Likes'>
				<span>
					<button onClick={this.likeNumbers}>{display}</button>
					<h3>{number}</h3>
				</span>
				
			</div>
		)
	}
}

export default Likes;