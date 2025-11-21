package com.example.attendancefr.dto;

import lombok.Data;

@Data
public class FaceDataDTO {
    private Long id;
    private Long userId;
    private boolean isActive;
    private String faceImageUrl;
    private String createdAt;
}