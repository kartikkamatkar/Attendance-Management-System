package com.example.attendancefr.dto;

import lombok.Data;

@Data
public class RegisterRequest {
    private String name;
    private String email;
    private String rollNumber;
    private String branch;
    private String division;
    private String password;
}