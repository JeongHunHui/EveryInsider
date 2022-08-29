package com.deca.NoticeBoardWebSite.repository;

import com.deca.NoticeBoardWebSite.domain.Comment;
import com.deca.NoticeBoardWebSite.domain.PostImage;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;

public class PostImageRepository {
    private final EntityManager em;

    public PostImageRepository(EntityManager em) {
        this.em = em;
    }

    public void save(PostImage postImage) {
        em.persist(postImage);
    }

    public List<PostImage> getImagesById(Long id){
        return em.createQuery("select p from PostImage p where p.postId = :id", PostImage.class)
                .setParameter("id", id)
                .getResultList();
    }

    public void deleteImage(Long id) {
        getImagesById(id).forEach(data->{
            em.remove(data);
        });
    }

    public List<String> getKeys(Long id) {
        List<String> keyList = new ArrayList<>();
        getImagesById(id).forEach(data ->{
            keyList.add(data.getKey());
        });
        return keyList;
    }
}
