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
  return id !== 0 ? (
    <Link to={`/postPage/${id}`}>
      <div key={id} className="postBox">
        <div className="postTitle">
          [{type}] {title}
        </div>
        <div>
          작성일: {time} | 조회수: {viewCount} | 좋아요:{like} | 싫어요:
          {disLike}
        </div>
      </div>
    </Link>
  ) : (
    <Link to="/writePage">
      <div key={id} className="postBox">
        <div>글이 없네요.. 글쓰러 가기!</div>
      </div>
    </Link>
  );
}
/*
<Link to={`/postPage/${id}`}>
  <div key={id} className="postBox">
    <div className="postTitle">
      [{type}] {title}
    </div>
    <div>
      작성일: {time} | 조회수: {viewCount} | 좋아요:{like} | 싫어요:
      {disLike}
    </div>
  </div>
</Link>
*/
export default PostBox;
