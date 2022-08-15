package com.deca.NoticeBoardWebSite.controller;

import com.deca.NoticeBoardWebSite.domain.PostData;
import com.deca.NoticeBoardWebSite.repository.MemoryPostDataRepository;
import com.deca.NoticeBoardWebSite.repository.PostDataRepository;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController // controller 임을 알려주는 표시 + ㄱResponseBody
@RequestMapping(value = "/api/postData")
public class PostDataController {
    PostDataRepository repository = new MemoryPostDataRepository();

    @GetMapping("/getAll")
    public List<PostData> getAllPostData(){
        List<PostData> postDataArray = repository.findAll();
        return postDataArray;
    }

    @GetMapping("/getCount")
    public Integer getPostCount(){
        return repository.getPostCount();
    }

    @PostMapping("/saveData")
    public String savePostData(@RequestBody PostData postData){
        repository.save(postData);
        return "success";
    }
}
