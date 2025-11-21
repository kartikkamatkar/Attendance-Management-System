package com.example.attendancefr.repository;

import com.example.attendancefr.model.Attendance;
import com.example.attendancefr.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface AttendanceRepository extends JpaRepository<Attendance, Long> {
    List<Attendance> findByUserOrderByDateDescTimeDesc(User user);

    @Query("SELECT a FROM Attendance a WHERE a.user = :user AND a.date = :date")
    List<Attendance> findTodayAttendance(@Param("user") User user, @Param("date") LocalDate date);

    @Query("SELECT a FROM Attendance a WHERE a.user = :user AND a.date >= :startDate ORDER BY a.date DESC, a.time DESC")
    List<Attendance> findLast30DaysAttendance(@Param("user") User user, @Param("startDate") LocalDate startDate);

    @Query("SELECT COUNT(a) FROM Attendance a WHERE a.user = :user")
    Long countTotalByUser(@Param("user") User user);

    @Query("SELECT a FROM Attendance a WHERE a.user = :user ORDER BY a.date DESC, a.time DESC LIMIT :limit")
    List<Attendance> findRecentAttendance(@Param("user") User user, @Param("limit") int limit);
    @Query("SELECT COUNT(a) FROM Attendance a WHERE a.user = :user AND a.status = com.example.attendancefr.model.AttendanceStatus.PRESENT")
    Long countPresentByUser(@Param("user") User user);

    @Query("SELECT COUNT(a) FROM Attendance a WHERE a.user = :user AND a.status = com.example.attendancefr.model.AttendanceStatus.ABSENT")
    Long countAbsentByUser(@Param("user") User user);
}