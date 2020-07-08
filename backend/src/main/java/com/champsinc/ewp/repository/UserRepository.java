package com.champsinc.ewp.repository;

import com.champsinc.ewp.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, String> {
    User findByEmail(String email);
    User findByActivationCode(String code);
    User findByForgotPasswordToken(String token);
}
