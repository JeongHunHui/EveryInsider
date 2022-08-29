package com.deca.NoticeBoardWebSite.service;

import com.deca.NoticeBoardWebSite.domain.PostImage;
import com.deca.NoticeBoardWebSite.repository.PostImageRepository;

import javax.transaction.Transactional;
import java.util.List;

@Transactional
public class PostImageService {
    private final PostImageRepository postImageRepository;

    public PostImageService(PostImageRepository postImageRepository){
        this.postImageRepository = postImageRepository;
    }

    public void save(PostImage postImage){
        postImageRepository.save(postImage);
    }

    public void deleteImage(Long id){
        postImageRepository.deleteImage(id);
    }

    public List<String> getKeys(Long id){
        return postImageRepository.getKeys(id);
    }
}
