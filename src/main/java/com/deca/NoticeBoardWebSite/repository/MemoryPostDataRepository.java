package com.deca.NoticeBoardWebSite.repository;

import com.deca.NoticeBoardWebSite.domain.Comment;
import com.deca.NoticeBoardWebSite.domain.PostData;
import org.springframework.http.ResponseEntity;

import java.util.*;
import java.util.stream.Collectors;

// 스프링 컨테이너에 Repository 로 등록
public class MemoryPostDataRepository implements PostDataRepository {
    private static Map<Long, PostData> store = new HashMap<>();
    public void save(PostData postData) {
        store.put(postData.getId(), postData);
    }

    @Override
    public Optional<PostData> findById(Long id) {
        return Optional.ofNullable(store.get(id));
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
        List<PostData> list = new ArrayList<>(store.values());
        Collections.reverse(list);
        return list;
    }

    public void clearStore(){
        store.clear();
    }

    @Override
    public List<PostData> findByType(String type) {
        List<PostData> list = store.values().stream().filter(data->data.getType() == type).collect(Collectors.toList());
        Collections.reverse(list);
        return list;
    }

    @Override
    public Long getPostCount() {
        return null;
    }

    @Override
    public ResponseEntity<String> updatePostLike(Long id) {
        return null;
    }

    @Override
    public ResponseEntity<String> updateDisLike(Long id) {
        return null;
    }

    @Override
    public ResponseEntity<String> updateViewCount(Long id) {
        return null;
    }

    @Override
    public void deletePost(Long id) {

    }

}
