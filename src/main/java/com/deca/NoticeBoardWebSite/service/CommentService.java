package com.deca.NoticeBoardWebSite.service;

import com.deca.NoticeBoardWebSite.domain.Comment;
import com.deca.NoticeBoardWebSite.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.transaction.Transactional;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Transactional
public class CommentService {
    private final CommentRepository commentRepository;
    public CommentService(CommentRepository commentRepository){
        this.commentRepository = commentRepository;
    }

    @Autowired
    private PasswordEncoder passwordEncoder;

    private String getTimeStamp(){
        SimpleDateFormat date = new SimpleDateFormat("yy.MM.dd HH:mm");
        return date.format(new Date());
    }

    public void uploadComment(Comment comment) {
        comment.setTime(getTimeStamp());
        comment.encodingPassword(passwordEncoder);
        commentRepository.save(comment);
    }

    public List<Comment> findByPostId(Long postId) {
        return commentRepository.findByPostId(postId);
    }

    public Comment findById(Long id){
        return commentRepository.findById(id);
    }

    public Long getCommentCountById(Long postId) {
        return commentRepository.getCommentCountById(postId);
    }

    public void deleteComment(Comment comment){
        commentRepository.deleteComment(comment);
    }

    public boolean checkPassword(Comment comment, String password){
        return comment.checkPassword(password, passwordEncoder);
    }
}
