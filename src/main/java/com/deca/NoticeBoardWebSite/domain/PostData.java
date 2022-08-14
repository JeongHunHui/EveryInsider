package com.deca.NoticeBoardWebSite.domain;

public class PostData {
    private String title;
    private String content;
    private Integer postNum;

    public String getTitle(){
        return title;
    }

    public String getContent(){
        return content;
    }

    public Integer getPostNum(){
        return postNum;
    }

    public void setPostNum(Integer postNum){
        this.postNum = postNum;
    }

    public PostData(String title, String content, Integer postNum) {
        this.title = title;
        this.content = content;
        this.postNum = postNum;
    }
}
