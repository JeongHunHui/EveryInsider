package com.deca.NoticeBoardWebSite.repository;

import com.deca.NoticeBoardWebSite.domain.Comment;

import java.util.List;

public interface CommentRepository {
    void save(Comment comment); // 댓글 저장
    List<Comment> findByPostId(Long postId); // 게시물 id로 댓글 불러오기
    Comment findById(Long id);
    Long getCommentCountById(Long postId); // 게시물 id로 댓글 개수 불러오기
    /** id 를 받아서 해당하는 댓글을 삭제한다 */
    void deleteComment(Comment comment);
}
