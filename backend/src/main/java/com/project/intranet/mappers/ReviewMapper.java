package com.project.intranet.mappers;

import com.project.intranet.domain.Review;
import com.project.intranet.requests.ReviewRequest;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface ReviewMapper {

    void insertReview(Review request);

    void deleteReviewById(@Param("id") int id);

    void deleteUserReviews(@Param("userId") int userId);

    void deleteBookReviews(@Param("bookId") int bookId);

    List<ReviewRequest> getBookReviews(@Param("bookId") int bookId);

    Review getById(@Param("id") int id);
}
