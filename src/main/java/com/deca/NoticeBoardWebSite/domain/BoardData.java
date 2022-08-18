package com.deca.NoticeBoardWebSite.domain;

import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@NoArgsConstructor
public class BoardData {
    // keys, values 는 나중에 DB에 넣고 꺼내쓰기
    private String[] keys = {"free", "humor", "issue", "secret"};
    private String[] values = {"자유", "유머", "이슈", "비밀"};
    public String getBoardNameByKey(String key) {
        for(int i = 0; i < keys.length; i++){
            if(key.equals(keys[i])) return values[i];
        }
        throw new IllegalStateException("게시판 Type 이 지정된 Type 과 다릅니다.");
    }

    // 게시판 타입을 키벨류 형식으로 반환
    public List<String[]> getTypeKeyValues(){
        // Map<String, String> keyValues = new HashMap<>();
        List<String[]> keyValues = new ArrayList<>();
        if(keys.length != values.length)
            throw new IllegalStateException("keys, values 값이 잘못되었습니다.");


        for(int i = 0; i < keys.length; i++){
            keyValues.add(new String[]{keys[i], values[i]});
        }
        return keyValues;
    }
}
