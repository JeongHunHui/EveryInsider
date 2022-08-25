package com.deca.NoticeBoardWebSite.repository;

import com.deca.NoticeBoardWebSite.domain.Comment;

import javax.persistence.EntityManager;
import java.util.List;

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
    public List<Comment> findByPostId(Long postId) {
        System.out.println(postId);
        List<Comment> list = em.createQuery("select p from Comment p where p.postId = :postId", Comment.class)
                .setParameter("postId", postId)
                .getResultList();
        return list;
    }

    @Override
    public Comment findById(Long id) {
        Comment comment = em.createQuery("select p from Comment p where p.id = :id", Comment.class)
                .setParameter("id", id)
                .getSingleResult();
        return comment;
    }

    @Override
    public Long getCommentCountById(Long postId) {
        return Long.valueOf(findByPostId(postId).size());
    }

    @Override
    public void deleteComment(Comment comment) {
        em.remove(comment);
    }
}
