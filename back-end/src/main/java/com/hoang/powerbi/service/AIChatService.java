package com.hoang.powerbi.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hoang.powerbi.model.ChatHistory;
import com.hoang.powerbi.model.User;
import com.hoang.powerbi.repository.ChatHistoryRepository;
import com.hoang.powerbi.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AIChatService {

    @Autowired
    private ChatHistoryRepository chatHistoryRepository;

    @Autowired
    private UserRepository userRepository;
    
    @Value("${gemini.api.key}")
    private String geminiApiKey;

    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();

    public String chat(String message) {
        // Kiểm tra message không null và không rỗng
        if (message == null || message.trim().isEmpty()) {
            return "Vui lòng nhập nội dung tin nhắn.";
        }

        try {
            return chatWithGemini(message);
        } catch (Exception e) {
            e.printStackTrace();
            // Chuyển sang phương án dự phòng khi chính
            try {
                return chatWithHuggingFace(message);
            } catch (Exception fallbackEx) {
                fallbackEx.printStackTrace();
                return "Sorry, I couldn't process your request. Error: " + e.getMessage();
            }
        }
    }
    
    // Phương thức dự phòng dùng Hugging Face
    private String chatWithHuggingFace(String message) throws Exception {
        String url = "https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill";
        
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("inputs", message);
        requestBody.put("wait_for_model", true);
        
        System.out.println("Request to HuggingFace: " + objectMapper.writeValueAsString(requestBody));
        
        HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestBody, headers);
        String responseBody = restTemplate.postForObject(url, request, String.class);
        
        System.out.println("Response from HuggingFace: " + responseBody);
        
        // Phân tích response từ Hugging Face
        JsonNode responseNode = objectMapper.readTree(responseBody);
        String aiResponse;
        
        if (responseNode.has("generated_text")) {
            aiResponse = responseNode.get("generated_text").asText();
        } else if (responseNode.isArray() && responseNode.size() > 0) {
            aiResponse = responseNode.get(0).path("generated_text").asText();
        } else {
            aiResponse = "I couldn't generate a proper response at this time.";
        }
        
        // Lưu vào history
        saveToHistory(message, aiResponse);
        
        return aiResponse;
    }

    private String chatWithGemini(String message) throws Exception {
        if (message == null || message.trim().isEmpty()) {
            return "Please provide a message.";
        }
        
        // Google Gemini 2.0 Flash API 
        String url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" + geminiApiKey;
        
        // Cấu trúc mới theo format chính xác của API
        Map<String, Object> requestBody = new HashMap<>();
        
        // Tạo contents với format đúng
        List<Map<String, Object>> contents = new ArrayList<>();
        Map<String, Object> content = new HashMap<>();
        
        // Tạo parts để chứa text
        List<Map<String, String>> parts = new ArrayList<>();
        Map<String, String> part = new HashMap<>();
        part.put("text", message);
        parts.add(part);
        
        // Thêm parts vào content
        content.put("parts", parts);
        // Thêm role vào content
        content.put("role", "user");
        
        contents.add(content);
        requestBody.put("contents", contents);
        
        // Các thông số trong generationConfig, không phải ở mức cao nhất
        Map<String, Object> generationConfig = new HashMap<>();
        generationConfig.put("temperature", 0.7);
        generationConfig.put("maxOutputTokens", 800);
        requestBody.put("generationConfig", generationConfig);
        
        System.out.println("Request to Gemini v1: " + objectMapper.writeValueAsString(requestBody));
        
        // Headers
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        
        // Request
        HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestBody, headers);
        String responseBody = restTemplate.postForObject(url, request, String.class);
        
        System.out.println("Response from Gemini: " + responseBody);
        
        // Phân tích phản hồi
        JsonNode rootNode = objectMapper.readTree(responseBody);
        String aiResponse;
        
        try {
            aiResponse = rootNode.path("candidates").get(0)
                .path("content").path("parts").get(0)
                .path("text").asText();
                
            // Lưu vào history
            saveToHistory(message, aiResponse);
            
            return aiResponse;
        } catch (Exception e) {
            System.out.println("Error parsing Gemini response: " + e.getMessage());
            throw e; // Để kích hoạt fallback
        }
    }
    
    private void saveToHistory(String message, String response) {
        try {
            String username = SecurityContextHolder.getContext().getAuthentication().getName();
            User user = userRepository.findByUsername(username).orElseThrow();
            ChatHistory history = new ChatHistory();
            history.setUser(user);
            history.setMessage(message);
            history.setResponse(response);
            chatHistoryRepository.save(history);
        } catch (Exception e) {
            System.out.println("Error saving chat history: " + e.getMessage());
        }
    }
}