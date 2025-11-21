package com.example.attendancefr.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class UserDTO {
    private Long id;
    private String name;
    private String email;
    private String rollNumber;
    private String branch;
    private String division;
    private String profileImageUrl;
    private LocalDateTime createdAt;
    private boolean faceRegistered;
}