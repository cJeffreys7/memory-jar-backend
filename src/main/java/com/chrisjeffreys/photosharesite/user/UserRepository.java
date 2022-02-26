package com.chrisjeffreys.photosharesite.user;

import com.chrisjeffreys.photosharesite.datamodel.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends CrudRepository<User, String> {

    List<User> findByEmail(String email);
}
