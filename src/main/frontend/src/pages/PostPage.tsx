import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Parser from 'html-react-parser';

import { postDataInterface } from './MainPage';

const getPostDataURL: string = 'http://localhost:8080/api/postData/getDataById';

function PostPage() {
  const [data, setData] = useState<postDataInterface>();
  const { id } = useParams();
  /* const defaultData: postDataInterface = {
    id: 0,
    title: 'title',
    type: 'free',
    content: 'content',
    viewCount: 0,
    like: 0,
    disLike: 0,
    time: 'currentTime',
  }; */
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
      <div className="postTitle">
        {data?.id}. {data?.title} | {data?.type}
      </div>
      <div>{Parser(data?.content)}</div>
      <div>
        조회수: {data?.viewCount} | 좋아요:{data?.like} | 싫어요:
        {data?.disLike} | 작성 일자: {data?.time}
      </div>
    </div>
  ) : (
    <div>로딩중...</div>
  );
}
/*
<div className="postBox">
      <div className="postTitle">
        {defaultData?.id}. {defaultData?.title} | {defaultData?.type}
      </div>
      <div>{defaultData?.content}</div>
      <div>
        조회수: {defaultData?.viewCount} | 좋아요:{defaultData?.like} | 싫어요:
        {defaultData?.disLike} | 작성 일자: {defaultData?.time}
      </div>
    </div>
*/

export default PostPage;
