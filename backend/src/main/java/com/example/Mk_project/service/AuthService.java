package com.example.Mk_project.service;

import com.example.Mk_project.model.User;
import com.example.Mk_project.repository.AuthRepo;
import com.example.Mk_project.utility.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.HashMap;
import java.util.Map;

@Service
public class AuthService {

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Autowired
    private AuthRepo authRepo;

    @Autowired
    private JwtUtil jwtUtil;




    public String register(User user) {

        if(authRepo.existsByEmail(user.getEmail()))
        {
            return "User already exists";
        }
        else if(authRepo.existsByMobileNumber(user.getMobileNumber()))
        {
            return "Mobile number already exists";
        }
        else {

            String encodedPassword = passwordEncoder.encode(user.getPassword());
            user.setPassword(encodedPassword);

            authRepo.save(user);
            Map<String,Object> claims =new HashMap<>();
            claims.put("id",user.getId());
            claims.put("name",user.getName());
            claims.put("email",user.getEmail());
            claims.put("mobileNumber",user.getMobileNumber());
            return jwtUtil.generateToken(claims,user.getEmail());
        }

    }

    public String login(User user) {

        if(authRepo.existsByEmail(user.getEmail()))
        {
            User existingUser = authRepo.findByEmail(user.getEmail());
            if(passwordEncoder.matches(user.getPassword(), existingUser.getPassword()))
            {
                Map<String,Object> claims =new HashMap<>();
                claims.put("id",existingUser.getId());
                claims.put("name",existingUser.getName());
                claims.put("email",existingUser.getEmail());
                claims.put("mobileNumber",existingUser.getMobileNumber());
                return jwtUtil.generateToken(claims,existingUser.getEmail());
            }
            else
            {
                return "Invalid credentials";
            }
        }
        else
        {
            return "User does not exists";
        }
    }
}
