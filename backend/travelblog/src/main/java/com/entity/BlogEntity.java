package com.entity;

import org.hibernate.annotations.GenericGenerator;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Blog_Entity")
public class BlogEntity {

	@Id
	@GeneratedValue(generator = "uuid2") // Use UUID generator
	@GenericGenerator(name = "uuid2", strategy = "uuid2") // Specify UUID generation strategy
	private String id;

	@Column(name = "NAME")
	private String name;

	@Column(name = "PH_NO")
	private String phno;

	@Column(name = "EMAIL")
	private String email;

	@Column(name = "TRAVEL_SPOT")
	private String travelSpot;

	@Column(name = "EXPERIENCE")
	private String experience;

	@Column(name = "RATING")
	private Integer rating;

}
