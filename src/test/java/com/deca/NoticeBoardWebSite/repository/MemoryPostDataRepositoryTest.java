package com.deca.NoticeBoardWebSite.repository;

import com.deca.NoticeBoardWebSite.domain.PostData;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import java.util.List;

// postData test code
class MemoryPostDataRepositoryTest {
    PostDataRepository repository = new MemoryPostDataRepository();

    // 각 테스트 종료마다 실행
    @AfterEach
    public void afterEach(){
        System.out.println("clear store");
        // store 에 저장된 내용 초기화
        repository.clearStore();
    }

    @Test
    public void save(){
        PostData postData1 = new PostData("testTitle", "testContent");
        repository.save(postData1);
        PostData result1 = repository.findByNum(postData1.getPostNum()).get();
        System.out.println("result1 = " + (result1 == postData1));
        Assertions.assertEquals(result1, postData1);
    }

    @Test
    public void findByTitle(){
        PostData postData = new PostData("testTitle1", "testContent");
        repository.save(postData);
        PostData postData2 = new PostData("testTitle2", "testContent");
        repository.save(postData2);

        PostData result2 = repository.findByTitle("testTitle2").get();
        System.out.println("result2 = " + (result2 == postData2));
        Assertions.assertEquals(result2, postData2);
    }

    @Test
    public void findAll(){
        PostData postData = new PostData("testTitle", "testContent");
        repository.save(postData);
        PostData postData2 = new PostData("testTitle", "testContent");
        repository.save(postData2);
        List<PostData> result = repository.findAll();
        for (PostData data: result) {
            System.out.println(data.getPostNum());
        }
    }
}
