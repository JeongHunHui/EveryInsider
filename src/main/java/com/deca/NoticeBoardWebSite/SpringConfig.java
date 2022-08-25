package com.deca.NoticeBoardWebSite;

import com.deca.NoticeBoardWebSite.repository.CommentRepository;
import com.deca.NoticeBoardWebSite.repository.JpaCommentRepository;
import com.deca.NoticeBoardWebSite.repository.JpaPostDataRepository;
import com.deca.NoticeBoardWebSite.repository.PostDataRepository;
import com.deca.NoticeBoardWebSite.service.CommentService;
import com.deca.NoticeBoardWebSite.service.PostDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import javax.persistence.EntityManager;

import static org.springframework.security.config.Customizer.withDefaults;


@Configuration
public class SpringConfig {

    private EntityManager em;

    @Autowired
    public SpringConfig(EntityManager em){
        this.em = em;
    }
    
    @Bean
    public PostDataService postDataService(){
        return new PostDataService(postDataRepository());
    }

    @Bean
    public PostDataRepository postDataRepository(){
        return new JpaPostDataRepository(em);
    }

    @Bean
    public CommentService commentService(){
        return new CommentService(commentRepository());
    }

    @Bean
    public CommentRepository commentRepository(){
        return new JpaCommentRepository(em);
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf().disable();
        http
                .httpBasic().disable()
                .cors();
        return http.build();
    }

    @Bean
    public PasswordEncoder getPasswordEncoder(){
        return new BCryptPasswordEncoder();
    }
}
