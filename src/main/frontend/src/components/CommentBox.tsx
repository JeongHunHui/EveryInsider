import React from 'react';
import axios from 'axios';
import { commentInterface } from './CommentList';
import deleteIcon from '../assets/images/deleteIcon.png';

interface commentBoxProps {
  prop: commentInterface;
  index: number;
  setIsSelect: Function;
}

const deleteCommentByIdURL: string =
  'http://localhost:8080/api/comment/deleteById';

function CommentBox({ prop, index, setIsSelect }: commentBoxProps) {
  async function deleteCommentById(inputPassword: string) {
    const req = {
      id: prop.id,
      password: inputPassword,
    };
    await axios
      .post(deleteCommentByIdURL, req)
      .then((res) => {
        if (res.data) {
          alert('댓글을 삭제하였습니다.');
          window.location.reload();
        } else alert('비밀번호가 옳지 않습니다.');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // 댓글 비밀번호 입력창을 띄우고,
  function deleteComment() {
    const korean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
    const inputPassword = prompt('댓글 비밀번호를 입력하세요.');
    if (inputPassword != null) {
      if (!korean.test(inputPassword)) deleteCommentById(inputPassword);
      else alert('비밀번호에 한글은 입력 할 수 없습니다');
    }
  }

  return (
    <div key={prop.id} className="commentBox">
      <div className="commentInfo">
        <span className="commentName">{prop.name}</span>
        <span>{prop.time}</span>
        <button
          type="button"
          className="commentDeleteButton"
          onClick={deleteComment}
        >
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
