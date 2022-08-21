package com.deca.NoticeBoardWebSite.repository;

import com.deca.NoticeBoardWebSite.domain.Comment;
import com.deca.NoticeBoardWebSite.domain.PostData;

import javax.persistence.EntityManager;
import java.util.List;
import java.util.Optional;

public class JpaCommentRepository implements CommentRepository{

    private final EntityManager em;

    public JpaCommentRepository(EntityManager em) {
        this.em = em;
    }

    @Override
    public void save(Comment comment) {
        em.persist(comment);
    }

    @Override
    public List<Comment> findById(Long postId) {
        List<Comment> list = em.createQuery("select p from comment p where p.postId = :postId", Comment.class)
                .setParameter("postId", postId)
                .getResultList();
        return list;
    }

    @Override
    public Long getCommentCountById(Long postId) {
        return Long.valueOf(findById(postId).size());
    }
}
