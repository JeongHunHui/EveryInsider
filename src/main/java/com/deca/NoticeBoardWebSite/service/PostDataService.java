package com.deca.NoticeBoardWebSite.service;

import com.deca.NoticeBoardWebSite.domain.BoardData;
import com.deca.NoticeBoardWebSite.domain.PostData;
import com.deca.NoticeBoardWebSite.repository.MemoryPostDataRepository;
import com.deca.NoticeBoardWebSite.repository.PostDataRepository;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;

@Service
public class PostDataService {
    private final PostDataRepository postDataRepository = new MemoryPostDataRepository();

    private static Integer postCount = 0;
    public Integer getPostCount(){
        return postCount;
    }

    private String getBoardName(String type){
        BoardData boardData = new BoardData();
        return boardData.getBoardNameByKey(type);
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
}
