package com.deca.NoticeBoardWebSite.domain;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity @Setter @Getter @ToString
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    // DB 에서 자동 생성
    /** 댓글 id, 생성된 순서대로 1부터 증가 */
    private Long id;

    /** 댓글이 속해있는 게시물 id, 왜래키(post_data 테이블의 id) */
    private Long postId;

    /** 댓글이 속한 댓글의 id 0이면 대댓글 x */
    private Long commentId;

    /** 댓글 작성자 이름 (길이제한:20) */
    private String name;

    /** 댓글 내용 (길이제한:1000) */
    private String content;

    /** yy.MM.dd HH:mm (길이제한:30) */
    private String time;

    /** 댓글 비밀번호, 댓글 삭제시 필요, 암호화 예정 (길이제한:10000) */
    private String password;

    /**
     * 비밀번호를 암호화
     * @param passwordEncoder 암호화 할 인코더 클래스
     * @return 변경된 유저 Entity
     */
    public Comment encodingPassword(PasswordEncoder passwordEncoder) {
        this.password = passwordEncoder.encode(this.password);
        return this;
    }

    /**
     * 비밀번호 확인
     * @param plainPassword 암호화 이전의 비밀번호
     * @param passwordEncoder 암호화에 사용된 클래스
     * @return true | false
     */
    public boolean checkPassword(String plainPassword, PasswordEncoder passwordEncoder) {
        return passwordEncoder.matches(plainPassword, this.password);
    }

    /**
     * 기본 생성자
     * @param postId 게시물 id
     * @param commentId 대댓글 id
     * @param name 작성자 이름
     * @param content 댓글 내용
     */
    public Comment(Long postId, Long commentId, String name, String content, String password) {
        this.id = 0L; // save 에서 set
        this.postId = postId;
        this.commentId = commentId;
        this.name = name;
        this.content = content;
        this.time = ""; // save 에서 set
        this.password = password;
    }

    public Comment() {
        this.id = 0L; // save 에서 set
        this.postId = 0L;
        this.commentId = 0L;
        this.name = "name";
        this.content = "content";
        this.time = ""; // save 에서 set
        this.password = "password";
    }
}
