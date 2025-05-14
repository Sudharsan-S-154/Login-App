package com.main;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EntityScan(basePackages = "com.entity")
@ComponentScan(basePackages = { "com.main", "com.queryController", "com.service", "com.entity", "com.model", "com.repository" ,"com.authentication"})
@EnableJpaRepositories(basePackages = "com.repository")
public class TravelblogApplication {

	public static void main(String[] args) {
		SpringApplication.run(TravelblogApplication.class, args);
	}

}
