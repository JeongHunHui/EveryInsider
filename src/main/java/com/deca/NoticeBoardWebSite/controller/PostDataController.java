package com.deca.NoticeBoardWebSite.controller;

import com.deca.NoticeBoardWebSite.domain.PostData;
import com.deca.NoticeBoardWebSite.service.PostDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController // 스프링 컨테이너에 controller 임을 알려주는 표시
                // + ResponseBody 기능
@RequestMapping(value = "/api/postData")
//
public class PostDataController {
    private final PostDataService postDataService;

    @Autowired
    // Autowired: 의존성 부여
    // 스프링 컨테이너에서 postDataService 가져옴
    // -> postDataService 도 컨테이너에 등록이 되어있어야함
    public PostDataController(PostDataService postDataService){
        this.postDataService = postDataService;
    }

    @GetMapping("/getAll")
    public List<PostData> getAllPostData(){
        List<PostData> postDataArray = postDataService.findAll();
        return postDataArray;
    }

    @GetMapping("/getDataById")
    public PostData getPostDataById(@RequestParam(value="id", required=false, defaultValue="0") Integer id){
        Optional<PostData> postData = postDataService.findById(id);
        if(postData.isPresent()) return postData.get();
        throw new IllegalStateException("잘못된 id 값입니다.");
    }

    @GetMapping("/getCount")
    public Integer getPostCount(){
        return postDataService.getPostCount();
    }

    @GetMapping("/getTypes")
    public List<String[]> getTypeKeyValues(){
        return postDataService.getTypeKeyValues();
    }

    @PostMapping("/upload")
    public String savePostData(@RequestBody PostData postData){
        postDataService.uploadPost(postData);
        return "success";
    }
}
