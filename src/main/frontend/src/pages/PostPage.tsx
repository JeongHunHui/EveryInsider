import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Parser from 'html-react-parser';
import './styles/PostPage.css';
import likeIcon from '../assets/images/likeIcon.png';
import disLikeIcon from '../assets/images/disLikeIcon.png';
import listIcon from '../assets/images/listIcon.png';
import deleteIcon from '../assets/images/deleteIcon.png';
import CommentList from '../components/CommentList';

import { postDataInterface } from './MainPage';

const getPostDataURL: string = process.env.REACT_APP_GET_POST_API_KEY;
const updateLikeURL: string = process.env.REACT_APP_UPDATE_LIKE_API_KEY;
const updateDisLikeURL: string = process.env.REACT_APP_UPDATE_DISLIKE_API_KEY;
const updateViewCountURL: string =
  process.env.REACT_APP_UPDATE_VIEWCOUNT_API_KEY;
const getCountByIdURL: string = process.env.REACT_APP_GET_COUNT_API_KEY;
const deletePostByIdURL: string = process.env.REACT_APP_DELETE_POST_API_KEY;

function PostPage() {
  const [commentCount, setCommentCount] = useState<number>();
  const [data, setData] = useState<postDataInterface>();
  const { id } = useParams();
  const navigate = useNavigate();

  async function getDataById() {
    await axios(getPostDataURL.concat(`?id=${id}`))
      .then((res) => setData(res.data))
      .catch((error) => console.log(error));
  }

  async function updateLike() {
    await axios
      .get(updateLikeURL.concat(`?id=${id}`))
      .then(() => getDataById())
      .catch((error) => console.log(error));
  }

  async function updateDisLike() {
    await axios
      .get(updateDisLikeURL.concat(`?id=${id}`))
      .then(() => getDataById())
      .catch((error) => console.log(error));
  }

  async function updateViewCount() {
    await axios
      .get(updateViewCountURL.concat(`?id=${id}`))
      .then(() => getDataById())
      .catch((error) => console.log(error));
  }

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

  async function deletePostById(inputPassword: string) {
    const req = {
      id,
      password: inputPassword,
    };
    await axios
      .post(deletePostByIdURL, req)
      .then((res) => {
        if (res.data) {
          alert('게시물을 삭제하였습니다.');
          navigate('/');
        } else alert('비밀번호가 옳지 않습니다.');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // 댓글 비밀번호 입력창을 띄우고,
  function deletePost() {
    const korean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
    const inputPassword = prompt('게시물 비밀번호를 입력하세요.');
    if (inputPassword != null) {
      if (!korean.test(inputPassword)) deletePostById(inputPassword);
      else alert('비밀번호에 한글은 입력 할 수 없습니다');
    }
  }

  useEffect(() => {
    updateViewCount();
    getCountById();
    getDataById();
  }, []);

  return data ? (
    <div className="postBox">
      <div>
        <span className="postTitle">
          [{data?.type}] {data?.title}
        </span>
        <span className="postInfo">
          작성자: {data.writer ?? '익명'} | {data?.time} | 조회수:{' '}
          {data?.viewCount}
        </span>
      </div>
      <div className="postContentBox">{Parser(data?.content)}</div>
      <div className="postMenuBox">
        <button className="deleteButton" type="button" onClick={deletePost}>
          <img alt="" src={deleteIcon} />
          <span>삭제하기</span>
        </button>
        <button className="likeButton" type="button" onClick={updateLike}>
          <img alt="" src={likeIcon} />
          <span>좋아요: {data.like}</span>
        </button>
        <button className="disLikeButton" type="button" onClick={updateDisLike}>
          <img alt="" src={disLikeIcon} />
          <span>싫어요: {data.disLike}</span>
        </button>
        <button
          className="goListButton"
          type="button"
          onClick={() => navigate(-1)}
        >
          <img alt="" src={listIcon} />
          <span>목록으로</span>
        </button>
      </div>
      <div className="commentListBox">
        <div className="postTitle">댓글 {commentCount}</div>
        <CommentList />
      </div>
    </div>
  ) : (
    // 테스트용
    <div>로딩중...</div>
  );
}

export default PostPage;
