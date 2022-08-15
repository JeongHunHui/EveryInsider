package com.deca.NoticeBoardWebSite.domain;

import lombok.*;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class PostData {
    private Integer postNum;
    private String title;
    private String content;

    public PostData(String title, String content) {
        this.title = title;
        this.content = content;
    }
}
