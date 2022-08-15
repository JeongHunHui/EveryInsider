import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/MainPage.css';

interface postDataInterface {
  /** 게시물 id, 생성된 순서대로 1부터 증가 */
  id: number;
  /** 게시물 제목 */
  title: string;
  /** 게시물 내용(문자열, 글자제한 있음) */
  content: string;
  /** 당일이면 시간, 당일이 아니면 년도/월/일 yy/MM/dd|HH:mm */
  time: string;
  /** 속해있는 게시판의 종류 BoardType. free, humor, issue, secret */
  type: string;
  /** 게시물의 조회수 */
  viewCount: number;
  /** 게시물의 좋아요 수 */
  like: number;
  /** 게시물의 싫어요 수 */
  disLike: number;
}

const getAllPostDataAPIURL: string =
  'http://localhost:8080/api/postData/getAll';

const savePostDataAPIURL: string =
  'http://localhost:8080/api/postData/saveData';

function MainPage() {
  const [postList, setPostList] = useState(Array<postDataInterface>);

  // 게시물들을 백엔드에서 불러와서 랜더링한다
  async function loadPosts() {
    await axios.get(getAllPostDataAPIURL).then((res) => {
      console.log(res.data);
      setPostList(res.data);
    });
  }

  useEffect(() => {
    loadPosts();
  }, []);

  // 새로운 게시물을 생성해 백엔드에 저장한다
  async function savePostData() {
    const req = {
      title: 'newTitle',
      content: 'empty content',
      type: 'free',
    };

    await axios
      .post(savePostDataAPIURL, req)
      .then((res) => {
        console.log(res.data);
        // 게시물을 백엔드에 저장한 뒤 랜더링
        loadPosts();
      })
      .catch((error) => console.log(error));
  }

  function addPost() {
    savePostData();
  }

  return (
    <div>
      <h1 className="title">자유 게시판</h1>
      <div className="menuButtonDiv">
        <button className="menuButton" type="button" onClick={addPost}>
          글쓰기
        </button>
      </div>
      <div>
        {postList.map((data: postDataInterface) => (
          <div key={data.id} className="postBox">
            <div className="postTitle">
              {data.id}. {data.title} | {data.type}
            </div>
            <div>{data.content}</div>
            <div>
              조회수: {data.viewCount} | 좋아요:{data.like} | 싫어요:
              {data.disLike} | 작성 일자: {data.time}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MainPage;
