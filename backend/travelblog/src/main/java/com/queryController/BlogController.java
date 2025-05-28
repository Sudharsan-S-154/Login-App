package com.queryController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.Model.BlogPostModel;
import com.Model.ResponseModel;
import com.service.BlogService;

@RestController
public class BlogController {

	@Autowired
	BlogService blogService;

	@CrossOrigin(origins = "http://127.0.0.1:5500", allowCredentials = "true", allowedHeaders = "*", methods = {
			RequestMethod.POST, RequestMethod.OPTIONS })
	@PostMapping("/blog")
	public ResponseEntity<?> saveBlogDetails(@RequestBody BlogPostModel blogPostModel) throws Exception {

		ResponseModel result = blogService.saveBlogDetails(blogPostModel);

		return new ResponseEntity<>(result, HttpStatus.OK);

	}
	
	@CrossOrigin(origins = "http://127.0.0.1:5500", allowCredentials = "true", allowedHeaders = "*", methods = {
			RequestMethod.GET, RequestMethod.OPTIONS })
	@GetMapping("/blog")
	public ResponseEntity<?> getBlogDetails(@RequestParam(required=false) String email) throws Exception {

		ResponseModel result = blogService.getBlogDetails(email);

		return new ResponseEntity<>(result, HttpStatus.OK);
		
	}
	
	@CrossOrigin(origins = "http://127.0.0.1:5500", allowCredentials = "true", allowedHeaders = "*", methods = {
			RequestMethod.DELETE, RequestMethod.OPTIONS })
	@DeleteMapping("/blog/{id}")
	public ResponseEntity<?> deleteSpecBlogDetail(@PathVariable String id) throws Exception {

		ResponseModel result = blogService.deleteBlog(id);

		return new ResponseEntity<>(result, HttpStatus.OK);
		
	}

}
