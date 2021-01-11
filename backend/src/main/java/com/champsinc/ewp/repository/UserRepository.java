package com.champsinc.ewp.repository;

import com.champsinc.ewp.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface UserRepository extends MongoRepository<User, String> {
    User findByEmail(String email);
    User findByActivationCode(String code);
    User findByForgotPasswordToken(String token);
    User findByUsername(String username);
    @Query(value="{}", fields="{_id : 0, name : 1, role : 1}")
    List<User> findAll();
}
