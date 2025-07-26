package com.example.Mk_project.repository;

import com.example.Mk_project.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AuthRepo extends JpaRepository<User,Long> {
    boolean existsByEmail(String email);
    boolean existsByMobileNumber(String mobileNumber);
    User findByEmail(String email);
}
