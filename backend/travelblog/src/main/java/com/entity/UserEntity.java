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
@Table(name = "User_Entity")
public class UserEntity {

	@Id
	@GeneratedValue(generator = "uuid2") // Use UUID generator
	@GenericGenerator(name = "uuid2", strategy = "uuid2") // Specify UUID generation strategy
	private String id;

	@Column(name = "NAME")
	private String name;

//	@Column(name = "PH_NO")
//	private String phno;

	@Column(name = "EMAIL")
	private String email;

	@Column(name = "PASSWORD")
	private String password;

	@Column(name = "ROLE")
	private String role;

}
