package com.hoang.powerbi.model;

public class ChatRequest {
    private String message;

    // Getters and setters
    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
    
    @Override
    public String toString() {
        return "ChatRequest{message='" + message + "'}";
    }
}