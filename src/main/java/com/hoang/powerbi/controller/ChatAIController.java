package com.hoang.powerbi.controller;

import lombok.Data;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/chat")
public class ChatAIController {


    @PostMapping
    public String askAI(@RequestBody ChatRequest request) {
        // Giả lập, thực tế bạn sẽ gửi request đến OpenAI, Gemini hoặc API nào bạn dùng.
        return "You asked: " + request.getQuestion() + ". (Simulated AI response)";
    }

    @Data   
    static class ChatRequest {
        private String question;
    }
}
