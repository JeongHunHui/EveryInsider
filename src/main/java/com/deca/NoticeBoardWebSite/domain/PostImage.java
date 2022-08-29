package com.deca.NoticeBoardWebSite.domain;

import lombok.*;

import javax.persistence.*;

@Entity
@Setter @Getter @ToString
@NoArgsConstructor
// getter, setter 추가, 문자열로 자동변환
public class PostImage {
    @Id
    @Column(name = "imageKey")
    /** 이미지 이름 */
    private String key;

    /** 이미지가 속해있는 게시물의 id, FK */
    private Long postId;

    public PostImage(String key, Long postId) {
        this.key = key;
        this.postId = postId;
    }
}
