package com.queryController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.Model.LoginModel;
import com.Model.ResponseModel;
import com.Model.SignupModel;
import com.service.LoginService;

@RestController
public class SignupController {

	@Autowired
	LoginService loginService;

	@CrossOrigin(origins = "http://127.0.0.1:5500")
	@PostMapping("/signup")
	public ResponseEntity<?> saveSignupDetails(@RequestBody SignupModel signupModel) throws Exception {

		ResponseModel result = loginService.saveSignupDetails(signupModel);

		return new ResponseEntity<>(result, HttpStatus.OK);

	}

	@CrossOrigin(origins = "http://127.0.0.1:5500")
	@PostMapping("/login")
	public ResponseEntity<?> saveLoginDetails(@RequestBody LoginModel loginModel) throws Exception {

		ResponseModel result = loginService.saveLoginDetails(loginModel);

		return new ResponseEntity<>(result, HttpStatus.OK);
	}
	
	@CrossOrigin(origins = "http://127.0.0.1:5500", allowCredentials = "true", allowedHeaders = "*", methods = {
			RequestMethod.GET, RequestMethod.OPTIONS })
	@GetMapping("/user")
	public ResponseEntity<?> getBlogDetails() throws Exception {

		ResponseModel result = loginService.getUser();

		return new ResponseEntity<>(result, HttpStatus.OK);
		
	}

}
