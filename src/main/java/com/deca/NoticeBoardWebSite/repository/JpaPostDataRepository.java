package com.deca.NoticeBoardWebSite.repository;

import com.deca.NoticeBoardWebSite.domain.Comment;
import com.deca.NoticeBoardWebSite.domain.PostData;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

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
    @Override
    public ResponseEntity<String> updatePostLike(Long id){
        Optional<PostData> postData = findById(id);
        if(postData != null){
            postData.get().setLike(postData.get().getLike()+1);
            save(postData.get());
            return new ResponseEntity<>("ok!", HttpStatus.OK);
        }
        else return new ResponseEntity<>("can't find by id: " + id.toString(), HttpStatus.BAD_REQUEST);
    }

    @Override
    public ResponseEntity<String> updateDisLike(Long id) {
        Optional<PostData> postData = findById(id);
        if(postData != null){
            postData.get().setDisLike(postData.get().getDisLike()+1);
            save(postData.get());
            return new ResponseEntity<>("ok!", HttpStatus.OK);
        }
        else return new ResponseEntity<>("can't find by id: " + id.toString(), HttpStatus.BAD_REQUEST);
    }

    @Override
    public ResponseEntity<String> updateViewCount(Long id) {
        Optional<PostData> postData = findById(id);
        if(postData != null){
            postData.get().setViewCount(postData.get().getViewCount()+1);
            save(postData.get());
            return new ResponseEntity<>("ok!", HttpStatus.OK);
        }
        else return new ResponseEntity<>("can't find by id: " + id.toString(), HttpStatus.BAD_REQUEST);
    }

    @Override
    public void deletePost(Long id) {
        PostData data = em.createQuery("select p from PostData p where p.id = :id", PostData.class)
                .setParameter("id", id)
                .getSingleResult();
        em.remove(data);
    }
}
