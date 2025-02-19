package com.example.Project.service;

import com.example.Project.dto.LoginRequest;
import com.example.Project.dto.SignupRequest;
import com.example.Project.entity.User;

public interface Auth {
    public String valid(LoginRequest loginRequest);

    public User createUser(SignupRequest signupRequest);
}
