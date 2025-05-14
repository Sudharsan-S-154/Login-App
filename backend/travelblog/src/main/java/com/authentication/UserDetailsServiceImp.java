package com.authentication;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.util.ObjectUtils;

import com.entity.UserEntity;
import com.repository.UserRepository;

@Component
public class UserDetailsServiceImp implements UserDetailsService {

	@Autowired
	UserRepository userRepository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		UserEntity user = userRepository.getByEmail(username);
		if (!ObjectUtils.isEmpty(user)) {
			return UserDetailsImp.getUserDetails(user);
		}

		else {
			System.out.println("Email is not available");
			return null;
		}

	}

}
