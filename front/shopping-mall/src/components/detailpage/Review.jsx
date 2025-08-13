import React from "react";
import {
  ReviewTitle,
  ReviewWrap,
  ReviewContainer,
  ReviewHeader,
  ReviewRating,
  ReviewInfo,
  ReviewImage,
  ReviewText,
  ActionBtnBox,
} from "./ReviewStyle";
import StarRating from "../reviewpage/StarRating";

const Review = ({ reviewList }) => {
  // 안전 가드
  const items = reviewList?.dtoList ?? [];
  const total = reviewList?.total ?? items.length ?? 0;

  return (
    <>
      <ReviewTitle>
        리뷰 <span>({total})</span>
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
                <span>{review.nickName ?? "nickName"}</span>
                <span>{review.createdAt ?? "25.06.18"}</span>
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

              <ReviewInfo>{review.meta ?? "남성 · M 구매"}</ReviewInfo>

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
