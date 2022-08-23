import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CommentInputBox from './CommentInputBox';
import './styles/CommentBox.css';

const getCommentByIdURL: string =
  'http://localhost:8080/api/comment/getByPostId';

interface commentInterface {
  /** 댓글 id, 생성된 순서대로 1부터 증가 */
  id: number;
  /** 댓글이 있는 게시물 id */
  postId: number;
  /** 댓글이 속한 댓글의 id */
  commentId: number;
  /** 댓글 작성자 이름 */
  name: string;
  /** 댓글 내용 */
  content: string;
  /** yy.MM.dd HH:mm */
  time: string;
  /** 댓글 비밀번호, 삭제 시 필요 */
  password: string;
  isSelected: boolean;
}

function CommentBox() {
  const { id } = useParams();
  const [commentList, setCommentList] = useState(Array<commentInterface>);

  // 게시물 Id로 해당 게시물의 댓글들을 가져온다
  async function getCommentById() {
    await axios
      .get(getCommentByIdURL.concat(`?postId=${id}`))
      .then((res) => {
        console.log(res.data);
        setCommentList(res.data);
        const newCommentList: Array<commentInterface> = res.data;
        for (let a = 0; a < newCommentList.length; a += 1) {
          newCommentList[a].isSelected = false;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getCommentById();
  }, []);

  return commentList.length === 0 ? (
    <div>
      {true && <CommentInputBox thisCommentId={0} />}
      <div className="commentButtonDiv">
        <button type="button">댓글이 없네요.. 댓글을 달아보세요!</button>
      </div>
    </div>
  ) : (
    <div>
      <CommentInputBox thisCommentId={0} />
      {commentList.map((data: commentInterface) => (
        <div>
          <div>{data.name}</div>
          <div>{data.content}</div>
          {data.isSelected && (
            <CommentInputBox thisCommentId={data.commentId} />
          )}
        </div>
      ))}
    </div>
  );
}

export default CommentBox;
