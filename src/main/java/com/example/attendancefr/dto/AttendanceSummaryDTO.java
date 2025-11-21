package com.example.attendancefr.dto;

import lombok.Data;

@Data
public class AttendanceSummaryDTO {
    private double overallAttendance;
    private double monthlyAttendance;
    private int totalPresent;
    private int totalAbsent;
    private int totalClasses;
    private int attendanceStreak;
}