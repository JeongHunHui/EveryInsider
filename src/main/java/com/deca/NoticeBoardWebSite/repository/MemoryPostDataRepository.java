package com.deca.NoticeBoardWebSite.repository;

import com.deca.NoticeBoardWebSite.domain.BoardData;
import com.deca.NoticeBoardWebSite.domain.PostData;
import lombok.Getter;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.*;

public class MemoryPostDataRepository implements PostDataRepository {
    private static Map<Integer, PostData> store = new HashMap<>();
    private static Integer postCount = 0;
    @Override
    public Integer getPostCount(){
        return postCount;
    }

    @Override
    public void save(PostData postData) {
        postData.setId(++postCount);
        SimpleDateFormat date = new SimpleDateFormat("yy/MM/dd|HH:mm");
        String timeStamp = date.format(new Date());
        postData.setTime(timeStamp);

        BoardData boardData = new BoardData();
        String name = boardData.getBoardNameByKey(postData.getType());
        if(name != "null"){
            postData.setType(name);
        }
        else System.out.println(postData.getType() + ": doesn't exist");

        store.put(postData.getId(), postData);
        System.out.println(Optional.ofNullable(store.get(postData.getId())));
    }

    @Override
    public Optional<PostData> findById(Integer postNum) {
        return Optional.ofNullable(store.get(postNum));
    }

    @Override
    public Optional<PostData> findByTitle(String title) {
        // store 에서 postData 의 title 과 매개변수 title 이 같은지 확인
        // 같으면 반환, 못찾아도 Optional 에 null 이 포함되서 반환
        return store.values().stream()
                .filter(postData -> postData.getTitle().equals(title))
                .findAny();
    }

    @Override
    public List<PostData> findAll() {
        return new ArrayList<>(store.values());
    }

    public void clearStore(){
        store.clear();
    }
}
