import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/MainPage.css';

interface postDataInterface {
  postNum: number;
  title: string;
  content: string;
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
    const req: postDataInterface = {
      postNum: 0,
      title: 'newTitle',
      content: 'empty content',
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
          <div key={data.postNum} className="postBox">
            <div className="postTitle">{data.title}</div>
            <div>{data.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MainPage;
