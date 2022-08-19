/* eslint-disable react/no-unused-prop-types */
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import './styles/MainPage.css';
import PostBox from '../components/PostBox';
import NavBar from '../components/NavBar';
import writeIcon from '../assets/images/writeIcon.png';

export interface postDataInterface {
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

const getAllPostDataURL: string = 'http://localhost:8080/api/postData/getAll';
const getBoardTypeURL: string = 'http://localhost:8080/api/postData/getTypes';
const getPostByTypeURL: string =
  'http://localhost:8080/api/postData/getDataByType';

function MainPage() {
  const [postList, setPostList] = useState(Array<postDataInterface>);
  const [typeKeyValues, setTypeKeyValues] = useState<string[][]>();
  const param = useParams();

  const defaultData: postDataInterface = {
    id: 0,
    title: 'title',
    type: 'free',
    content: 'content',
    viewCount: 0,
    like: 0,
    disLike: 0,
    time: 'currentTime',
  };

  // 게시물들을 백엔드에서 불러와서 랜더링한다
  async function loadPosts() {
    await axios
      .get(getAllPostDataURL)
      .then((res) => {
        console.log(res.data);
        setPostList(res.data);
      })
      .catch((error) => {
        console.log(error);
        setPostList([defaultData]);
      });
  }

  // 타입에 맞는 게시물들을 백엔드에서 불러와서 랜더링한다
  async function loadPostsByType() {
    await axios
      .get(getPostByTypeURL.concat(`?type=${param.type}`))
      .then((res) => {
        console.log(res.data);
        setPostList(res.data);
      })
      .catch((error) => {
        console.log(error);
        setPostList([defaultData]);
      });
  }

  // 게시판 type을 백엔드에서 불러온다
  async function getBoardType() {
    await axios
      .get(getBoardTypeURL)
      .then((res) => {
        console.log(res.data);
        setTypeKeyValues(res.data);
      })
      .catch((error) => {
        console.log(error);
        setTypeKeyValues([['', '테스트']]);
      });
  }

  useEffect(() => {
    getBoardType();
    console.log(param.type);
    if (param.type === undefined) {
      loadPosts();
    } else {
      loadPostsByType();
    }
  }, [param.type]);

  return (
    <div>
      <div className="menuDiv">
        {typeKeyValues ? <NavBar typeKeyValues={typeKeyValues} /> : <div />}
        <Link className="writeButton" to="/writePage">
          <img className="writeIcon" alt="" src={writeIcon} />
          <div>글쓰기</div>
        </Link>
      </div>
      <div>
        {postList.length !== 0 ? (
          postList.map(
            ({
              id,
              title,
              content,
              time,
              type,
              viewCount,
              like,
              disLike,
            }: postDataInterface) => (
              <PostBox
                id={id}
                title={title}
                content={content}
                time={time}
                type={type}
                viewCount={viewCount}
                like={like}
                disLike={disLike}
              />
            )
          )
        ) : (
          <div>
            <PostBox
              id={0}
              title=""
              content=""
              time=""
              type=""
              viewCount={0}
              like={0}
              disLike={0}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default MainPage;
