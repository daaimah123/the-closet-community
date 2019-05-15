import React, {Component} from 'react';
import FeedItem from './FeedItem.js';

class FeedList extends Component{
    render(){
		// const {explorPosts,profile } = this.props
		const arrayOfComponents = this.props.explorPosts.map((post)=>{
					
			const {profile} = this.props
			console.log('this is the props in feedlist', post);
					return <FeedItem key={post.post_id} userInfo={profile} url={post.url} likes={post.likes} caption={post.cation}/>
				})
		return(
			<div>
				
				{arrayOfComponents}
			</div>
		)
	}

}
export default FeedList;