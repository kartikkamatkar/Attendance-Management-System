package com.example.attendancefr.service;

import com.example.attendancefr.dto.UserDTO;
import com.example.attendancefr.dto.RegisterRequest;
import com.example.attendancefr.model.User;
import com.example.attendancefr.model.FaceData;
import com.example.attendancefr.repository.UserRepository;
import com.example.attendancefr.repository.FaceDataRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final FaceDataRepository faceDataRepository;
    private final PasswordEncoder passwordEncoder;

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public User registerUser(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already registered");
        }
        if (userRepository.existsByRollNumber(request.getRollNumber())) {
            throw new RuntimeException("Roll number already exists");
        }

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setRollNumber(request.getRollNumber());
        user.setBranch(request.getBranch());
        user.setDivision(request.getDivision());
        user.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        user.setEnabled(true);

        return userRepository.save(user);
    }

    public UserDTO convertToDTO(User user) {
        UserDTO dto = new UserDTO();
        dto.setId(user.getId());
        dto.setName(user.getName());
        dto.setEmail(user.getEmail());
        dto.setRollNumber(user.getRollNumber());
        dto.setBranch(user.getBranch());
        dto.setDivision(user.getDivision());
        dto.setProfileImageUrl(user.getProfileImageUrl());
        dto.setCreatedAt(user.getCreatedAt());

        // Check if face is registered
        boolean faceRegistered = faceDataRepository.existsByUser(user);
        dto.setFaceRegistered(faceRegistered);

        return dto;
    }

    public UserDTO updateProfile(User user, RegisterRequest request) {
        user.setName(request.getName());
        user.setBranch(request.getBranch());
        user.setDivision(request.getDivision());

        User updatedUser = userRepository.save(user);
        return convertToDTO(updatedUser);
    }
}