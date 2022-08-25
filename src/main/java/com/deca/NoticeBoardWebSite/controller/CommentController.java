package com.deca.NoticeBoardWebSite.controller;

import com.deca.NoticeBoardWebSite.domain.Comment;
import com.deca.NoticeBoardWebSite.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController // 스프링 컨테이너에 controller 임을 알려주는 표시
// + ResponseBody 기능
@RequestMapping(value = "/api/comment")
public class CommentController {

    private final CommentService commentService;

    @Autowired
    // Autowired: 의존성 부여
    // 스프링 컨테이너에서 commentService 가져옴
    // -> commentService 도 컨테이너에 등록이 되어있어야함
    public CommentController(CommentService commentService){
        this.commentService = commentService;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/getByPostId")
    public List<Comment> getCommentById(@RequestParam(value="postId") long postId){
        return commentService.findByPostId(postId);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/upload")
    public void uploadComment(@RequestBody Comment comment) {
        commentService.uploadComment(comment);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/getCountById")
    public Long getCommentCountById(@RequestParam(value="postId") Long postId) {
        return commentService.getCommentCountById(postId);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/deleteById")
    public Boolean deleteById(@RequestBody Map<String,String> map){
        Long id = Long.valueOf(map.get("id"));
        Comment findComment = commentService.findById(id);
        boolean isPasswordCorrect = commentService.checkPassword(findComment, map.get("password"));

        if(isPasswordCorrect){
            commentService.deleteComment(findComment);
            return true;
        }
        return false;
    }
}
