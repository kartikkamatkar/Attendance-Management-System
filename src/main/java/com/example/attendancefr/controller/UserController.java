package com.example.attendancefr.controller;

import com.example.attendancefr.dto.UserDTO;
import com.example.attendancefr.dto.RegisterRequest;
import com.example.attendancefr.model.User;
import com.example.attendancefr.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class UserController {
    private final UserService userService;

    @GetMapping("/me")
    public ResponseEntity<UserDTO> getCurrentUser(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(userService.convertToDTO(user));
    }

    @PutMapping("/profile")
    public ResponseEntity<UserDTO> updateProfile(
            @AuthenticationPrincipal User user,
            @RequestBody RegisterRequest request) {
        UserDTO updatedUser = userService.updateProfile(user, request);
        return ResponseEntity.ok(updatedUser);
    }
}