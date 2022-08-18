import React from 'react';
import { Link } from 'react-router-dom';
// import Parser from 'html-react-parser';
import { postDataInterface } from '../pages/MainPage';
import './styles/PostBox.css';

function PostBox({
  id,
  title,
  type,
  viewCount,
  like,
  disLike,
  time,
}: postDataInterface) {
  return (
    <Link to={`/postPage/${id}`}>
      <div key={id} className="postBox">
        <div className="postTitle">
          {id}. {title} | {type}
        </div>
        <div>
          조회수: {viewCount} | 좋아요:{like} | 싫어요:
          {disLike} | 작성 일자: {time}
        </div>
      </div>
    </Link>
  );
}

export default PostBox;
