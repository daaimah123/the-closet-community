import React, {Component} from 'react';
import Likes from './Likes'

class FeedItem extends Component{
    render(){
        const {url,likes,caption} = this.props;
        console.log('this is the props',this.props)
        return(
            <div className ='FeedItem'>
                
                    <img  src = {url}/>
                    <h1>{caption}</h1>
                    <Likes Likes={likes}/>
               
            </div>
        )
    }
}
export default FeedItem;