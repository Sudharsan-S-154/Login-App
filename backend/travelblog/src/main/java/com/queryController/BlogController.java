package com.queryController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.Model.BlogPostModel;
import com.Model.ResponseModel;
import com.service.BlogService;

@RestController
public class BlogController {

	@Autowired
	BlogService blogService;

	@CrossOrigin(origins = "http://127.0.0.1:5500")
	@PostMapping("/blog")
	public ResponseEntity<?> saveBlogDetails(@RequestBody BlogPostModel blogPostModel) throws Exception {

		ResponseModel result = blogService.saveBlogDetails(blogPostModel);

		return new ResponseEntity<>(result, HttpStatus.OK);

	}

}
