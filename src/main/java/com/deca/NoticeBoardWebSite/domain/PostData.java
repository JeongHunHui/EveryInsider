package com.deca.NoticeBoardWebSite.domain;

import lombok.*;

import javax.persistence.*;

@Entity
@Setter @Getter @ToString
// getter, setter 추가, 문자열로 자동변환
public class PostData {


    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    // DB 에서 자동 생성
    /** 게시물 id, 생성된 순서대로 1부터 증가 */
    private Long id;

    /** 게시물 제목 */
    private String title;

    /** 게시물 내용(문자열, 글자제한 있음) */
    private String content;

    /** yy.MM.dd HH:mm */
    private String time;

    /** 속해있는 게시판의 종류 free(자유), humor(유머), issue(이슈), secret(비밀) */
    private String type;

    /** 게시물의 조회수 */
    private Long viewCount;

    @Column(name = "postLike")
    /** 게시물의 좋아요 수 */
    private Long like;

    /** 게시물의 싫어요 수 */
    private Long disLike;

    /**
     * 기본 생성자
     * @param title 게시물 제목
     * @param content 게시물 내용
     * @param type 게시판 종류
     */
    public PostData(String title, String content, String type) {
        this.id = 0L; // save 에서 set
        this.title = title;
        this.content = content;
        this.time = ""; // save 에서 set
        this.type = type;
        this.viewCount = 0L;
        this.like = 0L;
        this.disLike = 0L;
    }

    /** 매개변수 없는 생성자, 기본값들이 들어감 */
    public PostData() {
        this.id = 0L; // save 에서 set
        this.title = "new Title";
        this.content = "empty content";
        this.time = ""; // save 에서 set
        this.type = "free";
        this.viewCount = 0L;
        this.like = 0L;
        this.disLike = 0L;
    }

    // 추가할 예정: 작성자, 댓글
}
