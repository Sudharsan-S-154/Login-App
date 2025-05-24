package com.specification;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

import com.entity.BlogEntity;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;

@Component
public class BlogSpecification implements Specification<BlogEntity> {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String email;

	public BlogSpecification(String email){
		this.email=email;
	}

	@Override
	public Predicate toPredicate(Root<BlogEntity> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
		if (email == null || email.isEmpty()) {
		    return criteriaBuilder.conjunction();
		}
		return criteriaBuilder.equal(root.get("email"), email);
	}

}
