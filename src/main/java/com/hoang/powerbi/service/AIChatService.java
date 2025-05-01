package com.hoang.powerbi.service;

import com.hoang.powerbi.model.ChatHistory;
import com.hoang.powerbi.model.User;
import com.hoang.powerbi.repository.ChatHistoryRepository;
import com.hoang.powerbi.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class AIChatService {

    @Autowired
    private ChatHistoryRepository chatHistoryRepository;

    @Autowired
    private UserRepository userRepository;

    private final RestTemplate restTemplate = new RestTemplate();

    public String chat(String message) {
        String url = "http://localhost:11434/api/generate";
        String requestJson = "{\"model\":\"mistral\", \"prompt\":\"" + message + "\"}";
        String response = restTemplate.postForObject(url, requestJson, String.class);

        // Save to history
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByUsername(username).orElseThrow();
        ChatHistory history = new ChatHistory();
        history.setUser(user);
        history.setMessage(message);
        history.setResponse(response);
        chatHistoryRepository.save(history);

        return response;
    }
}

//cài đặt ollama
// curl -fsSL https://ollama.com/install.sh | sh
// ollama run mistral
