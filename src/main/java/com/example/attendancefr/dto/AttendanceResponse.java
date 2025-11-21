package com.example.attendancefr.dto;

import lombok.Data;
import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class AttendanceResponse {
    private Long id;
    private String subject;
    private String classType;
    private LocalDate date;
    private LocalTime time;
    private String status;
    private boolean markedByFace;
}