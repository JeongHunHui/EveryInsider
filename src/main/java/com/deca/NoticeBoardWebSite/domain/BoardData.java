package com.deca.NoticeBoardWebSite.domain;

import lombok.NoArgsConstructor;

import java.util.HashMap;
import java.util.Map;

@NoArgsConstructor
public class BoardData {
    private Map<String, String> BoardType = new HashMap<>();
    private String[] keys = {"free", "humor", "issue", "secret"};
    private String[] values = {"자유", "유머", "이슈", "비밀"};
    private String board = "게시판";
    public String getBoardNameByKey(String key) {
        for(int i = 0; i < keys.length; i++){
            if(key.equals(keys[i])) return values[i] + board;
        }
        return "null";
    }
}
