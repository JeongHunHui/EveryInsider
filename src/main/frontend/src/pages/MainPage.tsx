import React, { useState, useRef } from 'react';
import axios from 'axios';
import './styles/MainPage.css';

interface postDataInterface {
  key: number;
  title: string;
  content: string;
}

const testAPIURL: string = 'http://localhost:8080/testHello';

function MainPage() {
  const [postList, setPostList] = useState(Array<postDataInterface>);
  const postCount = useRef<number>(0);
  async function testAPI(comment: string) {
    console.log(testAPIURL.concat('?comment=', comment));
    await axios
      .get(testAPIURL.concat('?comment=', comment))
      .then((res) => console.log(res.data));
  }
  function addPost() {
    postCount.current += 1;
    const postData = { title: '', content: '', key: postCount.current - 1 };
    postData.title = 'post_'.concat(postCount.current.toString());
    postData.content = 'empty content';

    setPostList(() => {
      return [...postList, postData];
    });
  }
  function removePost() {
    testAPI('hi guys~');
  }
  return (
    <div>
      <h1 className="title">자유 게시판</h1>
      <div className="menuButtonDiv">
        <button className="menuButton" type="button" onClick={addPost}>
          글쓰기
        </button>
        <button className="menuButton" type="button" onClick={removePost}>
          글삭제
        </button>
      </div>
      <div>
        {postList.map((data: postDataInterface) => (
          <div key={data.key} className="postBox">
            <div className="postTitle">{data.title}</div>
            <div>{data.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MainPage;
