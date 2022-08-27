import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

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
  const currentPageCount = useRef(0);
  const maxPageCount = useRef(0);
  const [pageCount, setPageCount] = useState(0);
  /** 한 페이지에 들어있는 게시물 개수 */
  const postCountOnePage = 2;
  /** 한 페이지에 보여주는 페이지의 개수 */
  const pageCountOnePage = 2;

  useEffect(() => {
    if (Number.isNaN(currentPage) || currentPage < 1) return;
    /** 전체 페이지 수 */
    const newPageCount = Math.ceil(postCount / postCountOnePage);
    setPageCount(newPageCount);
    // 유효한 페이지 접근 시
    if (currentPage <= newPageCount) {
      /** 전체 페이지 수 / 한번에 보여주는 페이지 수 */
      maxPageCount.current = Math.ceil(newPageCount / pageCountOnePage);
      /** 현재 페이지 번호 / 한번에 보여주는 페이지 수 */
      currentPageCount.current = Math.ceil(currentPage / pageCountOnePage);
      /** 보여줄 페이지 수 */
      const maxCount =
        // 현재가 마지막 페이지가 아니면 기본값
        // 마지막 페이지면 남은 페이지 수
        // eslint-disable-next-line no-nested-ternary
        maxPageCount.current > currentPageCount.current
          ? pageCountOnePage
          : newPageCount % pageCountOnePage === 0
          ? pageCountOnePage
          : newPageCount % pageCountOnePage;
      const arr = [];
      for (let i = 0; i < maxCount; i += 1) {
        arr[i] = (currentPageCount.current - 1) * pageCountOnePage + i + 1;
      }
      console.log(
        postCount,
        currentPage,
        newPageCount,
        maxPageCount.current,
        currentPageCount.current,
        maxCount
      );
      setArr(arr);
    }
    // 잘못된 페이지 접근 시
    else if (newPageCount > 0) {
      alert('잘못된 접근입니다.');
      navigator('/all/1');
    }
  }, [currentPage, boardType, postCount]);

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

  return pageCount > 0 ? (
    <div className="pageLink">
      {currentPageCount.current !== 1 && (
        <button
          onClick={() => {
            pageUpDown(-1);
          }}
          type="button"
        >
          이전
        </button>
      )}

      {indexArr.map((element) => (
        <NavLink to={`/${boardType}/${element}`} key={element}>
          {`<${element}>`}
        </NavLink>
      ))}
      {currentPageCount.current < maxPageCount.current && (
        <button
          onClick={() => {
            pageUpDown(1);
          }}
          type="button"
        >
          다음
        </button>
      )}
    </div>
  ) : (
    <div />
  );
}

export default PageNav;
