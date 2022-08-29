package com.deca.NoticeBoardWebSite.controller;

import com.deca.NoticeBoardWebSite.S3Uploader;
import com.deca.NoticeBoardWebSite.domain.PostData;
import com.deca.NoticeBoardWebSite.domain.PostImage;
import com.deca.NoticeBoardWebSite.service.PostDataService;
import com.deca.NoticeBoardWebSite.service.PostImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController // 스프링 컨테이너에 controller 임을 알려주는 표시
                // + ResponseBody 기능
@RequestMapping(value = "/api/postData")
//
public class PostDataController {
    private final PostDataService postDataService;
    private final PostImageService postImageService;

    @Autowired
    // Autowired: 의존성 부여
    // 스프링 컨테이너에서 postDataService 가져옴
    // -> postDataService 도 컨테이너에 등록이 되어있어야함
    public PostDataController(PostDataService postDataService, PostImageService postImageService, S3Uploader s3Uploader){
        this.postDataService = postDataService;
        this.postImageService = postImageService;
        this.s3Uploader = s3Uploader;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/getDataById")
    public PostData getPostDataById(@RequestParam(value="id", defaultValue="0") Long id){
        Optional<PostData> postData = postDataService.findById(id);
        if(postData.isPresent()) return postData.get();
        throw new IllegalStateException("잘못된 id 값입니다.");
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/getDataByType")
    public List<PostData> getPostDataByType(@RequestParam(value="type") String type){
        List<PostData> postDataList = type.equals("all") ? postDataService.findAll() : postDataService.findByType(type);
        return postDataList;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/getCount")
    public Long getPostCount(){
        return postDataService.getPostCount();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/getTypes")
    public List<String[]> getTypeKeyValues(){
        return postDataService.getTypeKeyValues();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/upload")
    public String savePostData(@RequestBody PostData postData){
        // 저장한 이미지들의 postId를 생성된 id로 변경 하기(나중에 ㄱ)
        postDataService.uploadPost(postData);
        return "success";
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/update/postLike")
    public ResponseEntity<String> updatePostLike(@RequestParam(value="id") Long id){
        return postDataService.updatePostLike(id);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/update/disLike")
    public ResponseEntity<String> updateDisLike(@RequestParam(value="id") Long id){
        return postDataService.updateDisLike(id);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/update/viewCount")
    public ResponseEntity<String> updateViewCount(@RequestParam(value="id") Long id){
        return postDataService.updateViewCount(id);
    }

    private final S3Uploader s3Uploader;

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/uploadFile")
    // 이미지 파일 업로드, s3버킷과 연동
    public String uploadFile(@RequestBody MultipartFile files) throws IOException {
        return s3Uploader.upload(files.getInputStream(), files.getOriginalFilename(), files.getSize(), 0L);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/deleteById")
    public Boolean deleteById(@RequestBody Map<String,String> map){
        Long id = Long.valueOf(map.get("id"));
        PostData findPostData = postDataService.findById(id).get();
        boolean isPasswordCorrect = postDataService.checkPassword(findPostData, map.get("password"));

        if(isPasswordCorrect){
//            // s3에 저장된 이미지들 삭제
//            postImageService.getKeys(id).forEach(data->{
//                s3Uploader.delete(data);
//            });
//            // DB에 저장된 이미지 data 삭제
//            postImageService.deleteImage(id);
            // 게시물 삭제
            postDataService.deletePost(id);
            return true;
        }
        return false;
    }
}
