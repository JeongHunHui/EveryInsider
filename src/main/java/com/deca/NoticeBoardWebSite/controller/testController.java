package com.deca.NoticeBoardWebSite.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class testController {
    @GetMapping("testHello")
    @ResponseBody
    public String hello(@RequestParam("comment") String comment){
        return "you said: " + comment;
    }
}
