package com.authentication;

import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import com.entity.UserEntity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@Component
@AllArgsConstructor
@NoArgsConstructor
public class UserDetailsImp implements UserDetails {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private String id;
	private String name;
	private String email;
//	private String phno;
	private String password;
	private List<GrantedAuthority> roles;

	public static UserDetailsImp getUserDetails(UserEntity userEntity) {
		SimpleGrantedAuthority autho = new SimpleGrantedAuthority(userEntity.getRole());
		return new UserDetailsImp(userEntity.getId(), userEntity.getName(), userEntity.getEmail(),
				userEntity.getPassword(), List.of(autho));

	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		// TODO Auto-generated method stub
		return roles;
	}

	@Override
	public String getPassword() {
		// TODO Auto-generated method stub
		return password;
	}

	@Override
	public String getUsername() {
		// TODO Auto-generated method stub
		return name;
	}

}
