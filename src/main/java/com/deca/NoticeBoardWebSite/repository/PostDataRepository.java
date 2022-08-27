package com.deca.NoticeBoardWebSite.repository;

import com.deca.NoticeBoardWebSite.domain.Comment;
import com.deca.NoticeBoardWebSite.domain.PostData;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

public interface PostDataRepository {
    void save(PostData postData); // 게시물 데이터 저장
    Optional<PostData> findById(Long id); // 번호로 게시물 찾기
    Optional<PostData> findByTitle(String title); // 제목으로 게시물 찾기
    List<PostData> findAll(); // 전체 게시물 불러오기
    List<PostData> findByType(String type); // 타입에 맞는 게시물 불러오기
    Long getPostCount(); // 전체 게시물 수 가져오기
    ResponseEntity<String> updatePostLike(Long id); // 좋아요 업데이트
    ResponseEntity<String> updateDisLike(Long id); // 싫어요 업데이트
    ResponseEntity<String> updateViewCount(Long id); // 조회수 업데이트
    /** 게시물 를 받아서 해당하는 게시물을 삭제한다 */
    void deletePost(Long id);
}
