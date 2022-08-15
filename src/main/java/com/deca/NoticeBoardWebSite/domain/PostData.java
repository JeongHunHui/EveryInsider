package com.deca.NoticeBoardWebSite.domain;

import lombok.*;

import java.util.*;

@Setter @Getter @ToString
// getter, setter 추가, 문자열로 자동변환
public class PostData {
    /** 게시물 id, 생성된 순서대로 1부터 증가 */
    private Integer id;

    /** 게시물 제목 */
    private String title;

    /** 게시물 내용(문자열, 글자제한 있음) */
    private String content;

    /** 당일이면 시간, 당일이 아니면 년도/월/일 yy/MM/dd|HH:mm */
    private String time;

    /** 속해있는 게시판의 종류 free(자유), humor(유머), issue(이슈), secret(비밀) */
    private String type;

    /** 게시물의 조회수 */
    private Integer viewCount;

    /** 게시물의 좋아요 수 */
    private Integer like;

    /** 게시물의 싫어요 수 */
    private Integer disLike;

    /**
     * 기본 생성자
     * @param title 게시물 제목
     * @param content 게시물 내용
     * @param type 게시판 종류
     */
    public PostData(String title, String content, String type) {
        this.id = 0; // save 에서 set
        this.title = title;
        this.content = content;
        this.time = ""; // save 에서 set
        this.type = type;
        this.viewCount = 0;
        this.like = 0;
        this.disLike = 0;
    }

    /** 매개변수 없는 생성자, 기본값들이 들어감 */
    public PostData() {
        this.id = 0; // save 에서 set
        this.title = "new Title";
        this.content = "empty content";
        this.time = ""; // save 에서 set
        this.type = "free";
        this.viewCount = 0;
        this.like = 0;
        this.disLike = 0;
    }

    // 추가할 예정: 작성자, 댓글
}
