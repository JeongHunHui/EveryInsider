import React from 'react';
import { Link } from 'react-router-dom';
import { postDataInterface } from '../pages/MainPage';
import './styles/PostBox.css';

interface postBoxPropInterface {
  data: postDataInterface;
}

function PostBox({ data }: postBoxPropInterface) {
  return data !== null ? (
    <Link to={`/postPage/${data.id}`}>
      <div key={data.id} className="postBox">
        <div className="postTitle">
          [{data.type}] {data.title}
        </div>
        <div>
          작성일: {data.time} | 조회수: {data.viewCount} | 좋아요:{data.like} |
          싫어요:
          {data.disLike}
        </div>
      </div>
    </Link>
  ) : (
    <Link to="/writePage">
      <div className="postBox">
        <div>글이 없네요.. 글쓰러 가기!</div>
      </div>
    </Link>
  );
}

export default PostBox;
