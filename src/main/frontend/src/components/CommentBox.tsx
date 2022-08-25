import React from 'react';
import { commentInterface } from './CommentList';
import deleteIcon from '../assets/images/deleteIcon.png';

interface commentBoxProps {
  prop: commentInterface;
  index: number;
  setIsSelect: Function;
}

function CommentBox({ prop, index, setIsSelect }: commentBoxProps) {
  // function setIsSelect(index: number) {
  //   for (let i = 0; i < commentList.length; i += 1) {
  //     if (i === index)
  //       commentList[index].isSelected = !commentList[index].isSelected;
  //     else commentList[i].isSelected = false;
  //   }
  //   setCommentList([...commentList]);
  // }
  return (
    <div key={prop.id} className="commentBox">
      <div className="commentInfo">
        <span className="commentName">{prop.name}</span>
        <span>{prop.time}</span>
        <button type="button" className="commentDeleteButton">
          <img src={deleteIcon} alt="" />
        </button>
      </div>
      <button
        type="button"
        onClick={() => {
          setIsSelect(index);
        }}
        className="commentContent"
      >
        {prop.content}
      </button>
    </div>
  );
}
export default CommentBox;
