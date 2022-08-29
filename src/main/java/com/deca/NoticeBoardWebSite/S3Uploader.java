package com.deca.NoticeBoardWebSite;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.deca.NoticeBoardWebSite.repository.PostImageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.net.URL;
import java.util.Date;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class S3Uploader {

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    private final AmazonS3Client s3Client;



    public String upload(InputStream inputStream, String originFileName, long fileSize) {
        String s3FileName = UUID.randomUUID() + "-" + originFileName;

        ObjectMetadata objMeta = new ObjectMetadata();
        objMeta.setContentLength(fileSize);

        s3Client.putObject(bucket, s3FileName, inputStream, objMeta);

        return s3Client.getUrl(bucket, s3FileName).toString();
    }

    /**
     * @param key 삭제할 이미지 파일 이름
     * */
    public void delete(String key){
        // 게시물 id 로 db에 있는 해당 게시물의 이미지들의 키들을 가져옴, db와 s3에서 삭제
        // db 에서 키 리스트 가져오고 반복문 돌려서 s3에서 삭제
        // db 에서는 id로 삭제
        s3Client.deleteObject(bucket, key);
    }
}