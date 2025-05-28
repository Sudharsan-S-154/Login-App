package com.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.Model.BlogGetModel;
import com.Model.BlogPostModel;
import com.Model.BlogReadParams;
import com.Model.ResponseModel;
import com.authentication.JwtUtility;
import com.authentication.UserDetailsImp;
import com.entity.BlogEntity;
import com.repository.BlogRepository;
import com.specification.BlogSpecification;

@Service
public class BlogService {

	@Autowired
	private UserDetailsImp userDetailsImp;

	@Autowired
	private BlogRepository blogRepository;

	@Autowired
	private JwtUtility jwtUtility;

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

	public ResponseModel getBlogDetails(String email) throws Exception {
		ResponseModel responseModel = new ResponseModel();
//		String email = blogReadParams.getEmail();
		var spec = new BlogSpecification(email);
		List<BlogEntity> blogEntity = blogRepository.findAll(spec);

		List<BlogGetModel> blogGetModelList = new ArrayList<BlogGetModel>();
		for (BlogEntity blog : blogEntity) {
			BlogGetModel blogGetModel = BlogGetModel.builder().id(blog.getId()).name(blog.getName())
					.email(blog.getEmail()).phno(blog.getPhno()).travelSpot(blog.getTravelSpot())
					.experience(blog.getExperience()).rating(blog.getRating()).build();
			blogGetModelList.add(blogGetModel);
		}
		responseModel.setData(blogGetModelList);

		return responseModel;

	}

	public ResponseModel deleteBlog(String blogId) {
		ResponseModel response = new ResponseModel();
		try {
			Optional<BlogEntity> tempBlog = blogRepository.findById(blogId);
			if (tempBlog.isPresent()) {
				BlogEntity blog = tempBlog.get();
				blogRepository.deleteById(blogId);
				response.setData("Blog deleted successfully");
			}
			else {
				response.setError("Error occurs");
			}
		} catch (Exception e) {
                response.setError("Error occurs!!");
		}
		return response;
	}

}
