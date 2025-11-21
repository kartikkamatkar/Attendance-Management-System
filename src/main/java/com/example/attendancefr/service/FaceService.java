package com.example.attendancefr.service;

import com.example.attendancefr.dto.FaceDataDTO;
import com.example.attendancefr.model.FaceData;
import com.example.attendancefr.model.User;
import com.example.attendancefr.repository.FaceDataRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FaceService {
    private final FaceDataRepository faceDataRepository;

    public FaceData registerFace(User user, String faceEmbedding, String imageUrl) {
        Optional<FaceData> existingFaceData = faceDataRepository.findByUser(user);

        FaceData faceData;
        if (existingFaceData.isPresent()) {
            faceData = existingFaceData.get();
            faceData.setFaceEmbedding(faceEmbedding);
            faceData.setFaceImageUrl(imageUrl);
            faceData.setActive(true);
        } else {
            faceData = new FaceData();
            faceData.setUser(user);
            faceData.setFaceEmbedding(faceEmbedding);
            faceData.setFaceImageUrl(imageUrl);
            faceData.setActive(true);
        }

        return faceDataRepository.save(faceData);
    }

    public Optional<FaceData> getFaceData(User user) {
        return faceDataRepository.findByUser(user);
    }

    public boolean isFaceRegistered(User user) {
        return faceDataRepository.existsByUser(user);
    }

    public FaceDataDTO convertToDTO(FaceData faceData) {
        FaceDataDTO dto = new FaceDataDTO();
        dto.setId(faceData.getId());
        dto.setUserId(faceData.getUser().getId());
        dto.setActive(faceData.isActive());
        dto.setFaceImageUrl(faceData.getFaceImageUrl());
        dto.setCreatedAt(faceData.getCreatedAt().toString());
        return dto;
    }

    public void deleteFaceData(User user) {
        Optional<FaceData> faceData = faceDataRepository.findByUser(user);
        faceData.ifPresent(faceDataRepository::delete);
    }
}