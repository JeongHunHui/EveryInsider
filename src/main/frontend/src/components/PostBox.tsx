import React from 'react';
import Parser from 'html-react-parser';
import { postDataInterface } from '../pages/MainPage';

function PostBox({
  id,
  title,
  type,
  content,
  viewCount,
  like,
  disLike,
  time,
}: postDataInterface) {
  return (
    <div key={id} className="postBox">
      <div className="postTitle">
        {id}. {title} | {type}
      </div>
      <div>{Parser(content)}</div>
      <div>
        조회수: {viewCount} | 좋아요:{like} | 싫어요:
        {disLike} | 작성 일자: {time}
      </div>
    </div>
  );
}

export default PostBox;
