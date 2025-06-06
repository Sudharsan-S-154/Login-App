package com.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import com.entity.BlogEntity;

@Repository
public interface BlogRepository extends JpaRepository<BlogEntity, String>,JpaSpecificationExecutor<BlogEntity> {

	void deleteById(BlogEntity blog);

//	UserEntity getByEmail(String email);

}
