import React,{Component} from 'react';
import ImageUploadFrom from './ImageUploadFrom';
import FeedList from './FeedList';
// import Profile from '../Profile/Profile';
//  ff9994

class ExplorPage extends Component{
    constructor(props){
        super(props)
        this.state={
            explorPosts:[],
            profile:[],
            authId:''
            

        }
    }
    componentWillMount(){
        //call auth
        // this.setState({ profile: {} });

        // get the user auth if
        // store it as a variable
        const { userProfile, getProfile } = this.props.auth;


        // update state with user data
        if (!userProfile) {
          getProfile((err, profile) => {
            let sub = profile.sub.split("|");
            let id = sub[1]
            this.getUserpost(id)
            this.setState({
                profile: profile,
                authId: id,
            })
            this.getExportPageData();
          });
        } else {
            let sub = userProfile.sub.split("|");
            let id = sub[1]
          this.setState({
                profile: userProfile,
                authId: id,
            });
            this.getExportPageData();
        }
    }
   
     getExportPageData =()=>fetch('/explorpage/')
        .then(res=>{return res.json()})
        .then(usersPosts => {
            console.log('users post',usersPosts)
            this.setState({
                isLoaded: true,
                explorPosts: usersPosts
            });
        
        }).catch(err => console.log(err))


        

    
    render(){
        const {explorPosts, profile, authId} = this.state;
        return(
            <div className='ExplorPage'>
                <ImageUploadFrom explorPosts={explorPosts} profileinfo={profile} authId={authId}/>
                <FeedList explorPosts={explorPosts} profileinfo ={profile}/>
            </div>
        )
    }
};
export default ExplorPage;