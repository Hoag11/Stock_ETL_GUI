package com.hoang.powerbi.repository;

import com.hoang.powerbi.model.ChatHistory;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ChatHistoryRepository extends JpaRepository<ChatHistory, Long> {}