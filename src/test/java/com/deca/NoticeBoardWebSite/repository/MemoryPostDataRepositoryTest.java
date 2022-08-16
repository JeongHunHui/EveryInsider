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
        // store 에 저장된 내용 초기화
        repository.clearStore();
        System.out.println("----- clear store -----");
    }

    /*
    @Test
    public void save(){
        PostData postData = new PostData();
        repository.save(postData);
        PostData result = repository.findById(postData.getId()).get();
        System.out.println("time stamp: " + result.getTime());
        System.out.println("save test result = " + (result == postData));
        Assertions.assertEquals(result, postData);
    }

    @Test
    public void findByTitle(){
        PostData postData = new PostData("testTitle1", "empty", "issue");
        repository.save(postData);

        PostData result = repository.findByTitle("testTitle1").get();
        System.out.println("result = " + (result == postData));
        Assertions.assertEquals(result, postData);
    }

    @Test
    public void findAll(){
        PostData postData1 = new PostData();
        repository.save(postData1);
        PostData postData2 = new PostData();
        repository.save(postData2);
        List<PostData> result = repository.findAll();
        for (PostData data: result) {
            System.out.println(data.getId());
        }
    }
    */
}
