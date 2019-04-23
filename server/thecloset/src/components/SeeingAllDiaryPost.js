import React, { Component } from 'react';
import AddingToDiary from './AddingToDiary';
import DeleteFromDiary from './DeleteFromDiary';

class SeeingAllDiaryPost extends Component {
  render() {
    return (
      <div className="SeeingAllDiaryPost">
      <AddingToDiary />
      <DeleteFromDiary />
        
      </div>
    );
  }
}

export default SeeingAllDiaryPost;