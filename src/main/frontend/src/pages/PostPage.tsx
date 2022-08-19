import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Parser from 'html-react-parser';
import './styles/PostPage.css';
import likeIcon from '../assets/images/likeIcon.png';
import disLikeIcon from '../assets/images/disLikeIcon.png';
import listIcon from '../assets/images/listIcon.png';

import { postDataInterface } from './MainPage';

const getPostDataURL: string = 'http://localhost:8080/api/postData/getDataById';

function PostPage() {
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
  useEffect(() => {
    console.log(id);
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
        <button className="likeButton" type="button">
          <img alt="" src={likeIcon} />
          <span>좋아요: {data.like}</span>
        </button>
        <button className="disLikeButton" type="button">
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
    </div>
  ) : (
    // 테스트용
    <div>로딩중...</div>
  );
}

export default PostPage;
