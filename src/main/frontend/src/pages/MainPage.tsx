/* eslint-disable react/no-unused-prop-types */
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './styles/MainPage.css';
import { useSelector } from 'react-redux';
import PostBox from '../components/PostBox';
import NavBar from '../components/NavBar';
import PageNav from '../components/PageNav';
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
  /** 게시물의 작성자 */
  writer: string;
}

interface stateInterface {
  pageNavConsts: {
    postCountInOnePage: number;
    pageCountInOnePage: number;
  };
}

const getPostByTypeURL: string = process.env.REACT_APP_GET_POSTDATA_API_KEY;
const getBoardTypeURL: string = process.env.REACT_APP_GET_BOARDTYPE_API_KEY;

function MainPage() {
  const [postList, setPostList] = useState(Array<postDataInterface>);
  const [typeKeyValues, setTypeKeyValues] = useState<string[][]>();
  const [postCount, setPostCount] = useState<number>();
  const param = useParams();
  const navigate = useNavigate();
  const postCountInOnePage: number = useSelector((data: stateInterface) => {
    return data.pageNavConsts.postCountInOnePage;
  });

  // 타입에 맞는 게시물들을 백엔드에서 불러와서 랜더링한다
  async function loadPostsByType() {
    await axios
      .get(getPostByTypeURL.concat(`?type=${param.type}`))
      .then((res) => {
        const list: postDataInterface[] = res.data;
        setPostCount(list.length);
        // 10은 postNav의 변수와 같은값이 되야함
        const pageNum = (parseInt(param.page, 10) - 1) * postCountInOnePage;
        const newList: postDataInterface[] = [];
        for (let i = 0; i < postCountInOnePage; i += 1) {
          if (list[pageNum + i] === undefined) break;
          newList[i] = list[pageNum + i];
        }
        setPostList(newList);
      })
      .catch((error) => {
        alert('잘못된 접근입니다.');
        navigate('/all/1');
        console.log(error);
      });
  }

  // 게시판 type을 백엔드에서 불러온다
  async function getBoardType() {
    await axios
      .get(getBoardTypeURL)
      .then((res) => {
        setTypeKeyValues(res.data);
      })
      .catch((error) => {
        console.log(error);
        setTypeKeyValues([['', '테스트']]);
      });
  }

  useEffect(() => {
    if (param.type === undefined) navigate('/all/1');
    else if (param.page === undefined) navigate('./1');
    else loadPostsByType();
    getBoardType();
    console.log(param.page);
  }, [param.type, param.page]);

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
          postList.map((element: postDataInterface) => (
            <PostBox key={element.id} data={element} />
          ))
        ) : (
          <PostBox key={0} data={null} />
        )}
      </div>
      <PageNav
        postCount={postCount}
        currentPage={parseInt(param.page, 10)}
        boardType={param.type}
      />
    </div>
  );
}

export default MainPage;
