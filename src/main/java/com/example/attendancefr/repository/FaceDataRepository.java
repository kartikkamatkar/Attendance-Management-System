package com.example.attendancefr.repository;

import com.example.attendancefr.model.FaceData;
import com.example.attendancefr.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FaceDataRepository extends JpaRepository<FaceData, Long> {
    Optional<FaceData> findByUser(User user);
    Optional<FaceData> findByUserId(Long userId);
    boolean existsByUser(User user);
}