import React from 'react';
import { commentInterface } from './CommentList';

interface commentDivProps {
  prop: commentInterface;
}

function CommentDiv({ prop }: commentDivProps) {
  return (
    <div key={prop.id}>
      <div>{prop.name}</div>
      <div>{prop.content}</div>
    </div>
  );
}
export default CommentDiv;
