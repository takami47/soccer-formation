package com.phil.societyformation.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class FormationController {

    @GetMapping("/")
    public String index() {
        return "formation";
    }
}