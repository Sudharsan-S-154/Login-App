package com.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.Model.BlogPostModel;
import com.Model.ResponseModel;
import com.authentication.JwtUtility;
import com.authentication.UserDetailsImp;
import com.entity.BlogEntity;
import com.entity.UserEntity;
import com.repository.BlogRepository;

@Service
public class BlogService {

	private final UserDetailsImp userDetailsImp;

	@Autowired
	BlogRepository blogRepository;

	@Autowired
	JwtUtility jwtUtility;

	BlogService(UserDetailsImp userDetailsImp) {
		this.userDetailsImp = userDetailsImp;
	}

	public ResponseModel saveBlogDetails(BlogPostModel blogPostModel) throws Exception {

		BlogEntity blogEntity;
		ResponseModel responseModel = new ResponseModel();
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		UserDetailsImp userEntity = (UserDetailsImp) authentication.getPrincipal();

		if (blogPostModel.getId() != null) {
			blogEntity = blogRepository.getById(blogPostModel.getId());
		} else {
			blogEntity = new BlogEntity();
		}

		blogEntity.setName(blogPostModel.getName());
		blogEntity.setPhno(blogPostModel.getPhno());
		blogEntity.setEmail(userEntity.getEmail());
		blogEntity.setTravelSpot(blogPostModel.getTravelSpot());
		blogEntity.setExperience(blogPostModel.getExperience());
		blogEntity.setRating(blogPostModel.getRating());

		blogEntity = blogRepository.save(blogEntity);

		responseModel.setData(blogEntity);

		return responseModel;

	}

}
