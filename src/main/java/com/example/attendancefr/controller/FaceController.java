package com.example.attendancefr.controller;

import com.example.attendancefr.dto.FaceDataDTO;
import com.example.attendancefr.model.FaceData;
import com.example.attendancefr.model.User;
import com.example.attendancefr.service.FaceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/face")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class FaceController {
    private final FaceService faceService;

    @PostMapping("/register")
    public ResponseEntity<FaceDataDTO> registerFace(
            @AuthenticationPrincipal User user,
            @RequestParam String faceEmbedding,
            @RequestParam String imageUrl) {
        FaceData faceData = faceService.registerFace(user, faceEmbedding, imageUrl);
        return ResponseEntity.ok(faceService.convertToDTO(faceData));
    }

    @GetMapping("/status")
    public ResponseEntity<Boolean> getFaceStatus(@AuthenticationPrincipal User user) {
        boolean isRegistered = faceService.isFaceRegistered(user);
        return ResponseEntity.ok(isRegistered);
    }

    @GetMapping("/data")
    public ResponseEntity<FaceDataDTO> getFaceData(@AuthenticationPrincipal User user) {
        Optional<FaceData> faceData = faceService.getFaceData(user);
        if (faceData.isPresent()) {
            return ResponseEntity.ok(faceService.convertToDTO(faceData.get()));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Void> deleteFaceData(@AuthenticationPrincipal User user) {
        faceService.deleteFaceData(user);
        return ResponseEntity.ok().build();
    }
}