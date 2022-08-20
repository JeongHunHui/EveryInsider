package com.deca.NoticeBoardWebSite.repository;

import com.deca.NoticeBoardWebSite.domain.PostData;

import javax.persistence.EntityManager;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

public class JpaPostDataRepository implements PostDataRepository{

    private final EntityManager em;

    public JpaPostDataRepository(EntityManager em) {
        this.em = em;
    }

    @Override
    public void save(PostData postData) {
        em.persist(postData);
    }

    @Override
    public Optional<PostData> findById(Long id) {
        PostData postData = em.find(PostData.class, id);
        return Optional.ofNullable(postData);
    }

    @Override
    public Optional<PostData> findByTitle(String title) {
        PostData postData = em.createQuery("select p from PostData p where p.title = :title", PostData.class)
                .setParameter("title", title)
                .getSingleResult();
        return Optional.ofNullable(postData);
    }

    @Override
    public List<PostData> findAll() {
        List<PostData> list = em.createQuery("select p from PostData p", PostData.class)
                .getResultList();
        Collections.reverse(list);
        return list;
    }

    @Override
    public List<PostData> findByType(String type) {
        List<PostData> list = em.createQuery("select p from PostData p where p.type = :type", PostData.class)
                .setParameter("type", type)
                .getResultList();
        Collections.reverse(list);
        return list;
    }

    @Override
    public Long getPostCount() {

        return Long.valueOf(findAll().size());
    }


    //SELECT COUNT(*) FROM 테이블;
}
