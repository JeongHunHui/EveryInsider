import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CommentBox from './CommentBox';

const getCountByIdURL: string =
  'http://localhost:8080/api/comment/getCountById';

function CommentList() {
  const { id } = useParams();
  const [commentCount, setCommentCount] = useState<number>();

  // 게시물 Id로 해당 게시물의 댓글들을 가져온다
  async function getCountById() {
    await axios
      .get(getCountByIdURL.concat(`?postId=${id}`))
      .then((res) => {
        console.log(res.data);
        setCommentCount(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getCountById();
  }, []);

  return (
    <div className="commentListBox">
      <div className="postTitle">댓글 {commentCount}</div>
      <CommentBox />
    </div>
  );
}

export default CommentList;
