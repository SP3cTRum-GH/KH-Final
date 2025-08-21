import React, { useEffect, useState } from "react";
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
import { Input } from "./DealModalStyle";
import { deleteReview, updateReview } from "../../api/reviewApi";

const Review = ({ reviewList }) => {
  // 1) 부모 prop을 표시용 로컬 상태로 복사
  const initialItems = reviewList?.dtoList ?? [];
  const [rows, setRows] = useState(initialItems);
  useEffect(() => {
    setRows(reviewList?.dtoList ?? []);
    setCount(reviewList?.totalCount ?? 0);
  }, [reviewList]);

  const [editingId, setEditingId] = useState(null);
  const [draftContent, setDraftContent] = useState("");
  const [draftRating, setDraftRating] = useState(0);
  const [draftImage, setDraftImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [count, setCount] = useState(reviewList?.totalCount ?? 0);

  const startEdit = (review) => {
    setEditingId(review.reviewNo ?? review.id ?? null);
    setDraftContent(review.content ?? "");
    setDraftRating(review.rating ?? 0);
    setDraftImage(review.reviewImg ?? null); // string | null
    setImagePreview(review.reviewImg ?? null);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setDraftContent("");
    setDraftRating(0);
    setDraftImage(null);
    setImagePreview(null);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    // 파일 자체는 보내지 않고 이름만 보낼 거라면 이름만 저장
    setDraftImage(file.name);
    try {
      setImagePreview(URL.createObjectURL(file));
    } catch {
      setImagePreview(null);
    }
  };

  const saveEdit = async (review) => {
    const reviewNo = review.reviewNo ?? review.id;

    // 2) JSON payload 구성 (파일명만 보냄)
    const payload = {
      content: draftContent ?? "",
      rating: draftRating ?? 0,
      productNo: review.productNo, // 서버에서 필요하다면 유지
      memberNo: 2, // 실제 로그인 사용자 번호로 교체
      reviewImg: typeof draftImage === "string" ? draftImage : "", // 파일명 문자열
    };

    try {
      await updateReview(reviewNo, payload); // axios.put(JSON)
      setRows((prev) =>
        prev.map((r) =>
          (r.reviewNo ?? r.id) === reviewNo
            ? {
                ...r,
                content: payload.content,
                rating: payload.rating,
                reviewImg: payload.reviewImg,
              }
            : r
        )
      );
      cancelEdit();
    } catch (err) {
      console.error("update failed:", err);
      alert("리뷰 수정에 실패했어요.");
    }
  };

  // 삭제 함수
  const handleDelete = async (reviewNo) => {
    const prev = [...rows];
    if (editingId === reviewNo) {
      cancelEdit();
    }

    setRows((cur) => cur.filter((r) => (r.reviewNo ?? r.id) !== reviewNo));
    setCount((c) => Math.max(0, c - 1));

    try {
      await deleteReview(reviewNo); // 서버 삭제
    } catch (err) {
      console.error("delete failed:", err);
      setRows(prev); // 실패 시 롤백
      alert("리뷰 삭제에 실패했어요.");
    }
  };

  return (
    <>
      <ReviewTitle>
        리뷰 <span>({count})</span>
      </ReviewTitle>

      <ReviewWrap>
        {rows.length === 0 ? (
          <ReviewContainer>
            <ReviewText>아직 등록된 리뷰가 없습니다.</ReviewText>
          </ReviewContainer>
        ) : (
          rows.map((review, idx) => {
            const id = review.reviewNo ?? idx;
            const isEditing = editingId === id;
            return (
              <ReviewContainer key={id}>
                <ReviewHeader>
                  <span>{review.memberId ?? "nickName"}</span>
                  <span>{review.regDate?.slice?.(0, 10) ?? ""}</span>
                </ReviewHeader>

                {/* 별점: 편집 중에만 변경 가능 */}
                <ReviewRating>
                  {isEditing ? (
                    <StarRating
                      max={5}
                      size={20}
                      color={"#fcc419"}
                      defaultRate={draftRating}
                      onSetRate={setDraftRating}
                    />
                  ) : (
                    <StarRating
                      max={5}
                      size={20}
                      color={"#fcc419"}
                      defaultRate={review.rating}
                      read={"none"}
                    />
                  )}
                </ReviewRating>

                {/* 리뷰 이미지: 미리보기 + 파일 선택 (편집 중에만 파일선택 가능) */}
                {(isEditing ? imagePreview : review.reviewImg) ? (
                  <ReviewImage
                    src={isEditing ? "imagePreview" : review.reviewImg}
                    alt="제품 리뷰 사진"
                  />
                ) : (
                  <></>
                )}

                {isEditing && (
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                )}

                {/* 리뷰 내용: 편집 중엔 textarea, 아니면 텍스트 */}
                {isEditing ? (
                  <Input
                    as="textarea"
                    rows={3}
                    value={draftContent}
                    onChange={(e) => setDraftContent(e.target.value)}
                    placeholder="리뷰 내용을 입력하세요"
                  />
                ) : (
                  <ReviewText>{review.content}</ReviewText>
                )}

                {/* 액션 버튼 */}
                {isEditing ? (
                  <ActionBtnBox>
                    <p onClick={() => saveEdit(review)}>저장</p>
                    <p onClick={cancelEdit}>취소</p>
                  </ActionBtnBox>
                ) : (
                  <ActionBtnBox>
                    <p onClick={() => startEdit(review)}>수정</p>
                    <p onClick={() => handleDelete(review.reviewNo)}>삭제</p>
                  </ActionBtnBox>
                )}
              </ReviewContainer>
            );
          })
        )}
      </ReviewWrap>
    </>
  );
};

export default Review;
