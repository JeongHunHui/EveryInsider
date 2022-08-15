package com.deca.NoticeBoardWebSite.repository;

import com.deca.NoticeBoardWebSite.domain.PostData;

import java.util.List;
import java.util.Optional;

public interface PostDataRepository {
    PostData save(PostData postData); // 게시물 데이터 저장
    Optional<PostData> findByNum(Integer postNum); // 번호로 게시물 찾기
    Optional<PostData> findByTitle(String title); // 제목으로 게시물 찾기
    List<PostData> findAll(); // 전체 게시물 불러오기
    Integer getPostCount();
    void clearStore();
}
