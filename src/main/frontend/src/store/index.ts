import { configureStore, createSlice } from '@reduxjs/toolkit';

// state 들을 보관하는 파일

/** 페이지 네비게이션 관련 전역 변수 */
const pageNavConsts = createSlice({
  name: 'pageNavConsts',
  initialState: {
    /** 한 페이지에 들어있는 게시물 개수 */
    postCountInOnePage: 3,
    /** 한 페이지에 보여주는 페이지의 개수 */
    pageCountInOnePage: 2,
  },
  reducers: undefined,
});

export default configureStore({
  reducer: { pageNavConsts: pageNavConsts.reducer },
});
