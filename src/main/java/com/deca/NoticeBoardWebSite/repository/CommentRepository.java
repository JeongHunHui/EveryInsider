package com.deca.NoticeBoardWebSite.repository;

import com.deca.NoticeBoardWebSite.domain.Comment;

import java.util.List;

public interface CommentRepository {
    void save(Comment comment); // 댓글 저장
    List<Comment> findById(Long postId); // 게시물 id로 댓글 불러오기
    Long getCommentCountById(Long postId); // 게시물 id로 댓글 개수 불러오기
}
