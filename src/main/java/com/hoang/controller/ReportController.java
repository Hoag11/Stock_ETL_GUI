package main.java.com.hoang.controller;

import main.java.com.hoang.service.PowerBIService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/reports")
@RequiredArgsConstructor
public class ReportController {

    private final PowerBIService powerBIService;

    @GetMapping("/{reportId}/embed-config")
    public ResponseEntity<?> getReportEmbedConfig(@PathVariable String reportId) {
        var embedConfig = powerBIService.getReportEmbedConfig(reportId);
        return ResponseEntity.ok(embedConfig);
    }

    @GetMapping("/standard")
    public ResponseEntity<?> getStandardReports() {
        var reports = powerBIService.getStandardReports();
        return ResponseEntity.ok(reports);
    }

    @GetMapping("/advanced")
    @PreAuthorize("hasAnyRole('ADVANCED', 'ADMIN')")
    public ResponseEntity<?> getAdvancedReports() {
        var reports = powerBIService.getAdvancedReports();
        return ResponseEntity.ok(reports);
    }
}