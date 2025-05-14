package com.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.Model.LoginModel;
import com.Model.ResponseModel;
import com.Model.SignupModel;
import com.authentication.JwtUtility;
import com.entity.UserEntity;
import com.repository.UserRepository;

@Service
public class LoginService {

	@Autowired
	UserRepository userRepository;

	@Autowired
	PasswordEncoder encoder;

	@Autowired
	AuthenticationManager authenticationManager;

	@Autowired
	JwtUtility jwtUtility;

	public ResponseModel saveSignupDetails(SignupModel signupModel) throws Exception {

		UserEntity userEntity;

		ResponseModel responseModel = new ResponseModel();

		UserEntity tempUser = userRepository.getByEmail(signupModel.getEmail());
		if (tempUser != null) {
			responseModel.setError("Email Already exists.");
			return responseModel;
		}

		if (signupModel.getId() != null) {
			userEntity = userRepository.getById(signupModel.getId());
		} else {
			userEntity = new UserEntity();
		}
		userEntity.setEmail(signupModel.getEmail());
		userEntity.setName(signupModel.getName());
		userEntity.setPassword(encoder.encode(signupModel.getPassword()));
//		userEntity.setPhno(signupModel.getPhno());
		userEntity.setRole("user");

		userEntity = userRepository.save(userEntity);

		responseModel.setData(userEntity);

		return responseModel;

	}

	public ResponseModel saveLoginDetails(LoginModel loginModel) throws Exception {

		ResponseModel responseModel = new ResponseModel();

		try {
			Authentication authentication = authenticationManager.authenticate(
					new UsernamePasswordAuthenticationToken(loginModel.getEmail(), loginModel.getPassword()));

			String token = jwtUtility.generateToken(authentication);

			SecurityContextHolder.getContext().setAuthentication(authentication);

			responseModel.setData(token);

			return responseModel;

		} catch (Exception e) {

			responseModel.setError("Invalid credentials");

			return responseModel;

		}
	}

}
