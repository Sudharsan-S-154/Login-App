package com.Model;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;

@Data
public class BlogPostModel {

	private String id;

	private String name;

	private String phno;

	private String travelSpot;

	private String experience;

	private Integer rating;

	private MultipartFile memories;

}
