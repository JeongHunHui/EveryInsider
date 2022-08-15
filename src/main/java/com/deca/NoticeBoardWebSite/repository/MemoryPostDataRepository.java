package com.deca.NoticeBoardWebSite.repository;

import com.deca.NoticeBoardWebSite.domain.PostData;
import lombok.Getter;

import java.util.*;

public class MemoryPostDataRepository implements PostDataRepository {
    private static Map<Integer, PostData> store = new HashMap<>();
    private static Integer postCount = 0;
    @Override
    public Integer getPostCount(){
        return postCount;
    }

    @Override
    public PostData save(PostData postData) {
        postData.setPostNum(++postCount);
        store.put(postData.getPostNum(), postData);
        return null;
    }

    @Override
    public Optional<PostData> findByNum(Integer postNum) {
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
