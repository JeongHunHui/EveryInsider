package com.deca.NoticeBoardWebSite.service;

import com.deca.NoticeBoardWebSite.domain.BoardData;
import com.deca.NoticeBoardWebSite.domain.Comment;
import com.deca.NoticeBoardWebSite.domain.PostData;
import com.deca.NoticeBoardWebSite.repository.PostDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.transaction.Transactional;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Transactional
// 스프링 컨테이너에 PostDataService 를 Service 로 등록한다
public class PostDataService {
    private final PostDataRepository postDataRepository;

    public PostDataService(PostDataRepository postDataRepository){
        this.postDataRepository = postDataRepository;
    }

    @Autowired
    private PasswordEncoder passwordEncoder;

    private final BoardData boardData = new BoardData();

    private String getBoardName(String type){
        return boardData.getBoardNameByKey(type);
    }

    public List<String[]> getTypeKeyValues(){
        return boardData.getTypeKeyValues();
    }

    private String getTimeStamp(){
        SimpleDateFormat date = new SimpleDateFormat("yy.MM.dd HH:mm");
        return date.format(new Date());
    }

    public Long getPostCount(){
        return postDataRepository.getPostCount();
    }

    public Long uploadPost(PostData postData){
        // postData.setId(++postCount);
        postData.setTime(getTimeStamp());
        postData.setType(getBoardName(postData.getType()));

        // 저장소에 저장
        postDataRepository.save(postData);
        return postData.getId();
    }

    public List<PostData> findAll(){
        return postDataRepository.findAll();
    }
    public Optional<PostData> findById(Long id){
        return postDataRepository.findById(id);
    }
    public List<PostData> findByType(String type){
        return postDataRepository.findByType(getBoardName(type));
    }
    public ResponseEntity<String> updateViewCount(Long id) {
        return postDataRepository.updateViewCount(id);
    }
    public ResponseEntity<String> updatePostLike(Long id) {
        return postDataRepository.updatePostLike(id);
    }
    public ResponseEntity<String> updateDisLike(Long id) {
        return postDataRepository.updateDisLike(id);
    }

    public void deletePost(Long id){
        postDataRepository.deletePost(id);
    }

    public boolean checkPassword(PostData postData, String password){
        return postData.checkPassword(password, passwordEncoder);
    }
}
