package com.hoang.powerbi.controller;

import com.hoang.powerbi.model.ChatRequest;
import com.hoang.powerbi.service.AIChatService;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai")
public class ChatAIController {

    @Autowired
    private AIChatService aiChatService;

    @PostMapping("/chat")
    public ResponseEntity<Map<String, Object>> chat(@RequestBody ChatRequest request) {
        System.out.println("Received request body: " + request);
        
        String messageText = request.getMessage();
        if (messageText == null || messageText.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(
                Map.of(
                    "answer", "Please provide a message",
                    "timestamp", new Date().toString()
                )
            );
        }
        
        String aiResponse = aiChatService.chat(messageText);
        
        Map<String, Object> response = new HashMap<>();
        response.put("answer", aiResponse);
        response.put("timestamp", new Date().toString());
        
        return ResponseEntity.ok(response);
    }
}