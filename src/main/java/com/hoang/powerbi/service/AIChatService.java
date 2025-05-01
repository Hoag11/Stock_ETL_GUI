package com.hoang.powerbi.service;

import java.net.URL;
import java.net.HttpURLConnection;
import org.springframework.stereotype.Service;
import java.io.*;

@Service
public class AIChatService {

    public String chat(String message) {
        try {
            URL url = new URL("http://localhost:11434/api/generate"); // Ollama default
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("POST");
            conn.setRequestProperty("Content-Type", "application/json");
            conn.setDoOutput(true);

            String jsonInput = "{\"model\":\"mistral\",\"prompt\":\"" + message + "\"}";
            try (OutputStream os = conn.getOutputStream()) {
                byte[] input = jsonInput.getBytes("utf-8");
                os.write(input, 0, input.length);
            }

            StringBuilder response = new StringBuilder();
            try (BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream(), "utf-8"))) {
                String line;
                while ((line = br.readLine()) != null) {
                    response.append(line);
                }
            }

            return response.toString();
        } catch (Exception e) {
            return "Error calling local AI: " + e.getMessage();
        }
    }
}

//cài đặt ollama
// curl -fsSL https://ollama.com/install.sh | sh
// ollama run mistral
