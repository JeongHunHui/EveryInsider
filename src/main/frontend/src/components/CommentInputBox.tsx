import axios from 'axios';
import React, { useRef } from 'react';
import { useParams } from 'react-router-dom';
import './styles/CommentInputBox.css';

const commentUploadURL: string = 'http://localhost:8080/api/comment/upload';

interface commentProps {
  thisCommentId: number;
}

function CommentInputBox({ thisCommentId }: commentProps) {
  const { id } = useParams();
  const commentName = useRef('');
  const commentPassword = useRef('');
  const commentContent = useRef('');

  interface reqInterface {
    postId: number;
    commentId: number;
    name: string;
    content: string;
    password: string;
  }

  // 게시물 Id로 해당 게시물의 댓글들을 가져온다
  async function uploadComment() {
    const newId: any = id;
    const req: reqInterface = {
      postId: parseInt(newId, 10),
      commentId: thisCommentId,
      name: commentName.current,
      content: commentContent.current,
      password: commentPassword.current,
    };
    console.log(req);
    await axios
      .post(commentUploadURL, req)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="commentInputBox">
      닉네임:{' '}
      <input
        className="commentInput"
        type="text"
        placeholder="작성자 이름"
        onChange={(e: { target: { value: string } }) => {
          commentName.current = e.target.value;
        }}
      />{' '}
      비밀번호:{' '}
      <input
        className="commentInput"
        type="text"
        placeholder="댓글 비밀번호"
        onChange={(e: { target: { value: string } }) => {
          commentPassword.current = e.target.value;
        }}
      />
      <button type="button" onClick={uploadComment}>
        완료!
      </button>
      <div className="commentContentInput">
        <input
          className="commentContentInput"
          type="text"
          placeholder="댓글 내용"
          onChange={(e: { target: { value: string } }) => {
            commentContent.current = e.target.value;
          }}
        />
      </div>
    </div>
  );
}

export default CommentInputBox;
