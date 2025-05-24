package com.Model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BlogGetModel {

	private String id;

	private String name;

	private String email;

	private String phno;

	private String travelSpot;

	private String experience;

	private Integer rating;

}
