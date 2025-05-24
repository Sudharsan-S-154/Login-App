package com.authentication;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;

@Configuration
public class SecurityConfig {

	@Autowired
	AuthEntryPoint authEntryPoint;

	@Autowired
	AuthFilter authFilter;

	@Bean
	public PasswordEncoder encoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
		return authConfig.getAuthenticationManager();
	}

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

		http.csrf(csrf -> csrf.disable())
				.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
				.authorizeHttpRequests(request -> request.requestMatchers("/signup", "/login").permitAll().anyRequest()
						.authenticated())
				
//				.cors(cors -> cors.disable())
//				.cors(cors -> cors.configurationSource(corsConfigurationSource()))
				.exceptionHandling(exception -> exception.authenticationEntryPoint(authEntryPoint))
				.cors();

		http.addFilterBefore(authFilter, UsernamePasswordAuthenticationFilter.class);

		return http.build();

	}
	
//	@Bean
//    public CorsConfigurationSource corsConfigurationSource() {
//        CorsConfiguration configuration = new CorsConfiguration();
//        configuration.setAllowedOrigins(List.of("http://127.0.0.1:5500")); // Allow frontend origin
//        configuration.setAllowedMethods(List.of("GET", "POST", "OPTIONS", "PUT", "DELETE")); // Allow necessary HTTP methods
//        configuration.setAllowedHeaders(List.of("Authorization", "Content-Type")); // Allow Authorization header
//        configuration.setAllowCredentials(true); // Allow credentials (cookies, authorization headers, etc.)
//
//        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//        source.registerCorsConfiguration("/**", configuration); // Apply this CORS config to all endpoints
//        return (CorsConfigurationSource) source;
//    }

}
