package com.example.attendancefr.controller;

import com.example.attendancefr.dto.AttendanceResponse;
import com.example.attendancefr.dto.AttendanceSummaryDTO;
import com.example.attendancefr.model.User;
import com.example.attendancefr.service.AttendanceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/attendance")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AttendanceController {
    private AttendanceService attendanceService;

    @GetMapping("/today")
    public ResponseEntity<List<AttendanceResponse>> getTodayAttendance(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(attendanceService.getTodayAttendance(user));
    }

    @GetMapping("/summary")
    public ResponseEntity<AttendanceSummaryDTO> getAttendanceSummary(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(attendanceService.getAttendanceSummary(user));
    }

    @GetMapping("/last-30-days")
    public ResponseEntity<List<AttendanceResponse>> getLast30DaysAttendance(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(attendanceService.getLast30DaysAttendance(user));
    }

    @GetMapping("/recent")
    public ResponseEntity<List<AttendanceResponse>> getRecentAttendance(
            @AuthenticationPrincipal User user,
            @RequestParam(defaultValue = "10") int limit) {
        return ResponseEntity.ok(attendanceService.getRecentAttendance(user, limit));
    }
}