package com.deca.NoticeBoardWebSite.service;

import com.deca.NoticeBoardWebSite.domain.BoardData;
import com.deca.NoticeBoardWebSite.domain.PostData;
import com.deca.NoticeBoardWebSite.repository.PostDataRepository;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;

// 스프링 컨테이너에 PostDataService 를 Service 로 등록한다
public class PostDataService {
    private final PostDataRepository postDataRepository;
    public PostDataService(PostDataRepository postDataRepository){
        this.postDataRepository = postDataRepository;
    }

    private final BoardData boardData = new BoardData();

    private static Integer postCount = 0;
    public Integer getPostCount(){
        return postCount;
    }

    private String getBoardName(String type){
        return boardData.getBoardNameByKey(type);
    }

    public List<String[]> getTypeKeyValues(){
        return boardData.getTypeKeyValues();
    }

    private String getTimeStamp(){
        SimpleDateFormat date = new SimpleDateFormat("yy/MM/dd|HH:mm");
        return date.format(new Date());
    }

    public Integer uploadPost(PostData postData){
        postData.setId(++postCount);
        postData.setTime(getTimeStamp());
        postData.setType(getBoardName(postData.getType()));

        // 저장소에 저장
        postDataRepository.save(postData);
        return postData.getId();
    }

    public List<PostData> findAll(){
        return postDataRepository.findAll();
    }
    public Optional<PostData> findById(Integer id){
        return postDataRepository.findById(id);
    }
}
