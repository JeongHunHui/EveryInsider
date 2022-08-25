import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import CommentInputBox from './CommentInputBox';
import CommentBox from './CommentBox';
import './styles/CommentList.css';

const getCommentByIdURL: string =
  'http://localhost:8080/api/comment/getByPostId';

export interface commentInterface {
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

function CommentList() {
  const { id } = useParams();
  const [commentList, setCommentList] = useState(Array<commentInterface>);
  const [reCommentList, setReCommentList] =
    useState<Map<number, commentInterface[]>>();
  const commentListRef = useRef<commentInterface[]>([]);

  // 게시물 Id로 해당 게시물의 댓글들을 가져온다
  async function getCommentById() {
    await axios
      .get(getCommentByIdURL.concat(`?postId=${id}`))
      .then((res) => {
        commentListRef.current = res.data;

        const mainList: commentInterface[] = [];
        const reList = new Map<number, any>();

        for (let a = 0; a < commentListRef.current.length; a += 1) {
          commentListRef.current[a].isSelected = false;
        }
        commentListRef.current.forEach((element) => {
          if (element.commentId === 0) {
            mainList.push(element);
          } else if (reList.has(element.commentId)) {
            reList.set(element.commentId, [
              // eslint-disable-next-line no-unsafe-optional-chaining
              ...reList?.get(element.commentId),
              element,
            ]);
          } else {
            reList.set(element.commentId, [element]);
          }
        });
        setCommentList(mainList);
        setReCommentList(reList);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const setIsSelect = (index: number) => {
    for (let i = 0; i < commentList.length; i += 1) {
      if (i === index)
        commentList[index].isSelected = !commentList[index].isSelected;
      else commentList[i].isSelected = false;
    }
    setCommentList([...commentList]);
  };

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
      {commentList.map((data: commentInterface, index: number) => (
        <div key={data.id} className="mainCommentBox">
          <div className="mainCommentButton">
            <CommentBox
              key={data.id}
              prop={data}
              index={index}
              setIsSelect={setIsSelect}
            />
          </div>
          {reCommentList?.get(data.id) !== undefined ? (
            <div className="reCommentBox">
              {reCommentList?.get(data.id).map((reData: commentInterface) => (
                <CommentBox
                  key={reData.id}
                  prop={data}
                  index={index}
                  setIsSelect={setIsSelect}
                />
              ))}
              {data.isSelected && <CommentInputBox thisCommentId={data.id} />}
            </div>
          ) : (
            <div>
              {data.isSelected && <CommentInputBox thisCommentId={data.id} />}
            </div>
          )}
        </div>
      ))}
      <div className="mainInputBox">
        <CommentInputBox thisCommentId={0} />
      </div>
    </div>
  );
}

export default CommentList;
