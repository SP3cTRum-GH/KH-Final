import React from "react";
import {
  ReviewTitle,
  ReviewWrap,
  ReviewContainer,
  ReviewHeader,
  ReviewRating,
  ReviewImage,
  ReviewText,
  ActionBtnBox,
} from "./ReviewStyle";
import StarRating from "../reviewpage/StarRating";

const Review = ({ reviewList }) => {
  // 안전 가드
  const items = reviewList?.dtoList ?? [];

  return (
    <>
      <ReviewTitle>
        리뷰 <span>({reviewList.totalCount})</span>
      </ReviewTitle>

      <ReviewWrap>
        {items.length === 0 ? (
          <ReviewContainer>
            <ReviewText>아직 등록된 리뷰가 없습니다.</ReviewText>
          </ReviewContainer>
        ) : (
          items.map((review, idx) => (
            <ReviewContainer key={review.reviewNo ?? idx}>
              <ReviewHeader>
                <span>{review.memberId ?? "nickName"}</span>
                <span>{review.regDate.slice(0, 10) ?? "25.06.18"}</span>
              </ReviewHeader>

              <ReviewRating>
                <StarRating
                  max={5}
                  size={20}
                  color={"#fcc419"}
                  defaultRate={review.rating}
                  read={"none"}
                />
              </ReviewRating>

              {review.reviewImg ? (
                <ReviewImage src={review.reviewImg} alt="제품 리뷰 사진" />
              ) : (
                <></>
              )}

              <ReviewText>{review.content}</ReviewText>

              <ActionBtnBox>
                <p>수정</p>
                <p>삭제</p>
              </ActionBtnBox>
            </ReviewContainer>
          ))
        )}
      </ReviewWrap>
    </>
  );
};

export default Review;
