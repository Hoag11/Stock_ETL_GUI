package com.hoang.powerbi.controller;

import com.hoang.powerbi.model.ChatRequest;
import com.hoang.powerbi.service.AIChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/ai")
public class ChatAIController {

    @Autowired
    private AIChatService aiChatService;

    @PostMapping("/chat")
    @PreAuthorize("hasAnyRole('USER', 'ADVANCED_USER', 'ADMIN')")
    public String chat(@RequestBody ChatRequest request) {
        return aiChatService.chat(request.getMessage());
    }
}
