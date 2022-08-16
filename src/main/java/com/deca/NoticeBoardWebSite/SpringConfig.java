package com.deca.NoticeBoardWebSite;

import com.deca.NoticeBoardWebSite.repository.MemoryPostDataRepository;
import com.deca.NoticeBoardWebSite.repository.PostDataRepository;
import com.deca.NoticeBoardWebSite.service.PostDataService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SpringConfig {
    @Bean
    public PostDataService postDataService(){
        return new PostDataService(postDataRepository());
    }

    @Bean
    public PostDataRepository postDataRepository(){
        return new MemoryPostDataRepository();
    }
}
