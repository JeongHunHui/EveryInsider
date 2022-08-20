package com.deca.NoticeBoardWebSite;

import com.deca.NoticeBoardWebSite.repository.JpaPostDataRepository;
import com.deca.NoticeBoardWebSite.repository.PostDataRepository;
import com.deca.NoticeBoardWebSite.service.PostDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.persistence.EntityManager;


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
}
