package com.example.attendancefr.service;

import com.example.attendancefr.dto.AttendanceResponse;
import com.example.attendancefr.dto.AttendanceSummaryDTO;
import com.example.attendancefr.model.Attendance;
import com.example.attendancefr.model.User;
import com.example.attendancefr.model.AttendanceStatus; // Make sure this import exists
import com.example.attendancefr.repository.AttendanceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AttendanceService {
    private final AttendanceRepository attendanceRepository;

    public List<AttendanceResponse> getTodayAttendance(User user) {
        LocalDate today = LocalDate.now();
        return attendanceRepository.findTodayAttendance(user, today)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<AttendanceResponse> getRecentAttendance(User user, int limit) {
        return attendanceRepository.findByUserOrderByDateDescTimeDesc(user)
                .stream()
                .limit(limit)
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<AttendanceResponse> getLast30DaysAttendance(User user) {
        LocalDate startDate = LocalDate.now().minusDays(30);
        return attendanceRepository.findLast30DaysAttendance(user, startDate)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public AttendanceSummaryDTO getAttendanceSummary(User user) {
        Long totalPresent = attendanceRepository.countPresentByUser(user);
        Long totalAbsent = attendanceRepository.countAbsentByUser(user);
        Long totalClasses = attendanceRepository.countTotalByUser(user);

        double overallAttendance = totalClasses > 0 ?
                (double) totalPresent / totalClasses * 100 : 0.0;

        // Calculate monthly attendance (last 30 days)
        LocalDate monthStart = LocalDate.now().minusDays(30);
        List<Attendance> monthlyAttendance = attendanceRepository.findLast30DaysAttendance(user, monthStart);

        long monthlyPresent = monthlyAttendance.stream()
                .filter(a -> a.getStatus() == AttendanceStatus.PRESENT)
                .count();

        double monthlyAttendancePercent = monthlyAttendance.size() > 0 ?
                (double) monthlyPresent / monthlyAttendance.size() * 100 : 0.0;

        AttendanceSummaryDTO summary = new AttendanceSummaryDTO();
        summary.setOverallAttendance(Math.round(overallAttendance * 100.0) / 100.0);
        summary.setMonthlyAttendance(Math.round(monthlyAttendancePercent * 100.0) / 100.0);
        summary.setTotalPresent(totalPresent.intValue());
        summary.setTotalAbsent(totalAbsent.intValue());
        summary.setTotalClasses(totalClasses.intValue());
        summary.setAttendanceStreak(calculateAttendanceStreak(user));

        return summary;
    }

    private int calculateAttendanceStreak(User user) {
        List<Attendance> recentAttendance = attendanceRepository.findByUserOrderByDateDescTimeDesc(user);

        int streak = 0;
        LocalDate currentDate = LocalDate.now();

        for (Attendance attendance : recentAttendance) {
            if (attendance.getDate().isBefore(currentDate.minusDays(1))) {
                break;
            }
            if (attendance.getStatus() == AttendanceStatus.PRESENT) {
                streak++;
                currentDate = attendance.getDate().minusDays(1);
            } else {
                break;
            }
        }

        return streak;
    }

    private AttendanceResponse convertToDTO(Attendance attendance) {
        AttendanceResponse dto = new AttendanceResponse();
        dto.setId(attendance.getId());
        dto.setSubject(attendance.getSubject());
        dto.setClassType(attendance.getClassType());
        dto.setDate(attendance.getDate());
        dto.setTime(attendance.getTime());
        dto.setStatus(attendance.getStatus().name());
        dto.setMarkedByFace(attendance.isMarkedByFace());
        return dto;
    }
}