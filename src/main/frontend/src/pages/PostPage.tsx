import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Parser from 'html-react-parser';
import './styles/PostPage.css';
import likeIcon from '../assets/images/likeIcon.png';
import disLikeIcon from '../assets/images/disLikeIcon.png';
import listIcon from '../assets/images/listIcon.png';
import CommentBox from '../components/CommentBox';

import { postDataInterface } from './MainPage';

const getPostDataURL: string = 'http://localhost:8080/api/postData/getDataById';
const updateLikeURL: string =
  'http://localhost:8080/api/postData/update/postLike';
const updateDisLikeURL: string =
  'http://localhost:8080/api/postData/update/disLike';
const updateViewCountURL: string =
  'http://localhost:8080/api/postData/update/viewCount';
const getCountByIdURL: string =
  'http://localhost:8080/api/comment/getCountById';

function PostPage() {
  const [commentCount, setCommentCount] = useState<number>();
  const [data, setData] = useState<postDataInterface>();
  const { id } = useParams();
  const navigate = useNavigate();

  // // 테스트용
  // const defaultData: postDataInterface = {
  //   id: 0,
  //   title: 'title',
  //   type: 'free',
  //   content: 'content',
  //   viewCount: 0,
  //   like: 0,
  //   disLike: 0,
  //   time: 'currentTime',
  // };

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
          {data?.time} | 조회수: {data?.viewCount}
        </span>
      </div>
      <div className="postContentBox">{Parser(data?.content)}</div>
      <div className="postMenuBox">
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
          onClick={() => navigate('/')}
        >
          <img alt="" src={listIcon} />
          <span>목록으로</span>
        </button>
      </div>
      <div className="commentListBox">
        <div className="postTitle">댓글 {commentCount}</div>
        <CommentBox />
      </div>
    </div>
  ) : (
    // 테스트용
    <div>로딩중...</div>
  );
}

export default PostPage;
