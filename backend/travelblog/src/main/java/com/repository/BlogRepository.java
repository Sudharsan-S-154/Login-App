package com.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.entity.BlogEntity;

@Repository
public interface BlogRepository extends JpaRepository<BlogEntity, String> {

//	UserEntity getByEmail(String email);

}
