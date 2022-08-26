import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface pageNavProp {
  postCount: number;
  currentPage: number;
  boardType: string;
}

/**
 * @param postCount 전체 게시물 개수
 * @param currentPage 현재 페이지
 */
function PageNav({ postCount, currentPage, boardType }: pageNavProp) {
  const [indexArr, setArr] = useState([]);
  const navigator = useNavigate();
  const currentPageCount = useRef(1);
  const maxPageCount = useRef(1);
  /** 한 페이지에 들어있는 게시물 개수 */
  const postCountOnePage = 10;
  /** 한 페이지에 보여주는 페이지의 개수 */
  const pageCountOnePage = 10;

  useEffect(() => {
    if (Number.isNaN(currentPage)) return;
    console.log(currentPage);
    /** 전체 페이지 수 */
    const pageCount: number = Math.ceil(postCount / postCountOnePage);
    // 유효한 페이지 접근 시
    if (currentPage <= pageCount) {
      /** 전체 페이지 수 / 한번에 보여주는 페이지 수 */
      maxPageCount.current = Math.ceil(pageCount / pageCountOnePage);
      /** 현재 페이지 번호 / 한번에 보여주는 페이지 수 */
      currentPageCount.current = Math.ceil(currentPage / pageCountOnePage);
      /** 보여줄 페이지 수 */
      const maxCount =
        // 현재가 마지막 페이지가 아니면 기본값
        // 마지막 페이지면 남은 페이지 수
        maxPageCount.current > currentPageCount.current
          ? pageCountOnePage
          : pageCount % pageCountOnePage;
      const arr = [];
      for (let i = 0; i < maxCount; i += 1) {
        arr[i] = (currentPageCount.current - 1) * pageCountOnePage + i + 1;
      }
      setArr(arr);
    }
    // 잘못된 페이지 접근 시
    else {
      alert('잘못된 접근입니다.');
      navigator('/all/1');
    }
  }, [currentPage]);

  function pageUpDown(changeNum: number) {
    if (
      currentPageCount.current + changeNum <= maxPageCount.current &&
      currentPageCount.current + changeNum > 0
    ) {
      navigator(
        `/${boardType}/${
          (currentPageCount.current + changeNum - 1) * pageCountOnePage + 1
        }`
      );
    }
  }

  return (
    <div>
      <button
        onClick={() => {
          pageUpDown(-1);
        }}
        type="button"
      >
        이전
      </button>
      {indexArr.map((element) => (
        <Link to={`/${boardType}/${element}`} key={element}>
          {`<${element}>`}
        </Link>
      ))}
      <button
        onClick={() => {
          pageUpDown(1);
        }}
        type="button"
      >
        다음
      </button>
    </div>
  );
}

export default PageNav;
