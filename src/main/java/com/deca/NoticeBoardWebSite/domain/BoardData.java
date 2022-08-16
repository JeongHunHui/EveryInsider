package com.deca.NoticeBoardWebSite.domain;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class BoardData {
    // keys, values 는 나중에 DB에 넣고 꺼내쓰기
    private String[] keys = {"free", "humor", "issue", "secret"};
    private String[] values = {"자유", "유머", "이슈", "비밀"};
    private String board = "게시판";
    public String getBoardNameByKey(String key) {
        for(int i = 0; i < keys.length; i++){
            if(key.equals(keys[i])) return values[i] + board;
        }
        throw new IllegalStateException("게시판 Type 이 지정된 Type 과 다릅니다.");
    }
}
