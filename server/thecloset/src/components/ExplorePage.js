import React, {component} from 'react';
import ExploreImageAndComment from './ExploreImageAndComment';
import ExploreLikes from './ExploreLikes';


class ExplorePage extends component {
    render(){
        return(
            <div className='ExplorePage'>
            <ExploreImageAndComment />
            <ExploreLikes />


            </div>
        )
    }

}
export default ExplorePage;