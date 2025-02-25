package com.example.Project.service;

import com.example.Project.dto.LoginRequest;
import com.example.Project.dto.SignupRequest;
import com.example.Project.entity.User;
import com.example.Project.repository.UserRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthImp implements Auth{

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;



    @Override
    public User createUser(SignupRequest signupRequest) {
        if(userRepository.existsByEmail(signupRequest.getEmail())){
            return null;
        }
        User user=new User();
        BeanUtils.copyProperties(signupRequest,user);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User createdUser = userRepository.save(user);
        user.setId(createdUser.getId());
        return user;
    }


    @Override
    public String valid(LoginRequest loginRequest) {
       // return loginRequest.getEmail()+"\n"+loginRequest.getPassword();
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(),loginRequest.getPassword()));
        if(authentication.isAuthenticated()){
            return "Ok";
        }
        return "False";
    }
}