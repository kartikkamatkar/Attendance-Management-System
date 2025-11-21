package com.example.attendancefr.dto;
import lombok.Data;

@Data
public class AuthResponse {
    private String token;
    private String type = "Bearer";
    private UserDTO user;

    public AuthResponse(String token, UserDTO user) {
        this.token = token;
        this.user = user;
    }

    // Default constructor (needed for Lombok and Jackson)
    public AuthResponse() {
    }
}