package com.authentication;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class AuthFilter extends OncePerRequestFilter {

	@Autowired
	JwtUtility jwtUtility;

	@Autowired
	UserDetailsServiceImp userDetailsService;

	public String parseJwt(HttpServletRequest request) {
		String authToken = request.getHeader("Authorization");
		if (authToken != null && authToken.startsWith("Bearer ")) {
			return authToken.substring(7);
		}
		System.out.println("Incorrect token");
		return null;
	}

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {

		if (request.getRequestURI().equals("/signup") || request.getRequestURI().equals("/login")) {
			filterChain.doFilter(request, response);
			return;
		}

		String token = parseJwt(request);
		if (token != null && jwtUtility.validateToken(token)) {
			String name = jwtUtility.getUserNameFromToken(token);
			UserDetailsImp userDetails = (UserDetailsImp) userDetailsService.loadUserByUsername(name);
			UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(userDetails, null,
					userDetails.getRoles());

			authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
			SecurityContextHolder.getContext().setAuthentication(authToken);
		}

		filterChain.doFilter(request, response);

	}

}
