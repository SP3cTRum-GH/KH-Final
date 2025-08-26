// Review.jsx
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  ReviewTitle,
  ReviewWrap,
  ReviewContainer,
  ReviewHeader,
  ReviewRating,
  ReviewImage,
  ReviewText,
  ActionBtnBox,
  ImgWrap,
  ImgDeleteBtn,
} from "./ReviewStyle";
import StarRating from "../reviewpage/StarRating";
import { Input } from "./DealModalStyle";
import { deleteReview, updateReview } from "../../api/reviewApi";
import { getCookie } from "../../util/cookieUtil";
import { API_SERVER_HOST } from "../../api/HostUrl";

// Helper: resolve image src (handles blob/http/data or server-relative)
const getImageSrc = (img) => {
  if (!img) return null;
  const s = String(img);
  if (
    s.startsWith("blob:") ||
    s.startsWith("http://") ||
    s.startsWith("https://") ||
    s.startsWith("data:")
  ) {
    return s;
  }
  return `${API_SERVER_HOST}${s}`;
};

const Review = ({ reviewList }) => {
  const initialItems = reviewList?.dtoList ?? [];
  const [rows, setRows] = useState(initialItems);
  const [count, setCount] = useState(reviewList?.totalCount ?? 0);

  useEffect(() => {
    setRows(reviewList?.dtoList ?? []);
    setCount(reviewList?.totalCount ?? 0);
  }, [reviewList]);

  // --- 편집 관련 상태 ---
  const [editingId, setEditingId] = useState(null);
  const [draftContent, setDraftContent] = useState("");
  const [draftRating, setDraftRating] = useState(0);
  const [draftFile, setDraftFile] = useState(null); // 새 파일
  const [deleteImg, setDeleteImg] = useState(false); // 삭제 플래그
  const [imagePreview, setImagePreview] = useState(null);

  const startEdit = (review) => {
    const id = review.reviewNo ?? review.id ?? null;
    setEditingId(id);
    setDraftContent(review.content ?? "");
    setDraftRating(review.rating ?? 0);

    setDraftFile(null); // 새 파일 초기화
    setDeleteImg(false); // 삭제 플래그 해제
    const currentImg = review.reviewImg ?? null;
    setImagePreview(currentImg ? getImageSrc(currentImg) : null);
  };

  const cancelEdit = (opts = { revoke: true }) => {
    if (opts.revoke && imagePreview?.startsWith?.("blob:")) {
      try {
        URL.revokeObjectURL(imagePreview);
      } catch (e) {
        console.log(e);
      }
    }
    setEditingId(null);
    setDraftContent("");
    setDraftRating(0);
    setDraftFile(null);
    setDeleteImg(false);
    setImagePreview(null);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setDraftFile(file); // 파일 저장
    setDeleteImg(false); // 파일 선택 시 삭제 플래그 해제
    setImagePreview(URL.createObjectURL(file));
  };

  const handleDeleteImage = () => {
    setDraftFile(null);
    setDeleteImg(true); // 삭제 플래그 on
    setImagePreview(null);
  };

  const saveEdit = async (review) => {
    const reviewNo = review.reviewNo ?? review.id;
    const fd = new FormData();

    fd.append("content", draftContent ?? "");
    fd.append("rating", String(draftRating ?? 0));

    if (review.productNo != null) {
      fd.append("productNo", String(review.productNo));
    }

    const memberCookie = getCookie("member");
    if (memberCookie?.memberId) {
      fd.append("memberNo", memberCookie.memberId); // 서버 요구사항 확인 필요
    }

    // 이미지 동작 전송값: 'new' | 'delete' | 'keep'
    const imageAction = draftFile ? "new" : deleteImg ? "delete" : "keep";
    fd.append("imageAction", imageAction);

    // 호환: 서버가 deleteImage(boolean)만 읽는 경우를 위한 추가 플래그
    if (imageAction === "delete") {
      fd.append("deleteImage", "true");
    }

    if (imageAction === "new" && draftFile) {
      // 새 파일 업로드
      fd.append("uploadFile", draftFile); // 서버에서 기대하는 파라미터명
    }

    // 디버깅
    // for (const [k, v] of fd.entries()) {
    //   console.log("[updateReview fd]", k, v);
    // }

    try {
      await updateReview(reviewNo, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // 로컬 상태 반영 (임시)
      setRows((prev) =>
        prev.map((r) => {
          const match = (r.reviewNo ?? r.id) === reviewNo;
          if (!match) return r;
          const nextImg = deleteImg
            ? ""
            : draftFile
            ? imagePreview
            : r.reviewImg;
          return {
            ...r,
            content: draftContent,
            rating: draftRating,
            reviewImg: nextImg,
          };
        })
      );

      cancelEdit({ revoke: false });
    } catch (err) {
      console.error("update failed:", err);
      alert("리뷰 수정에 실패했어요.");
    }
  };

  const handleDelete = async (reviewNo) => {
    const prev = [...rows];
    if (editingId === reviewNo) cancelEdit();

    setRows((cur) => cur.filter((r) => (r.reviewNo ?? r.id) !== reviewNo));
    setCount((c) => Math.max(0, c - 1));

    try {
      await deleteReview(reviewNo);
    } catch (err) {
      console.error("delete failed:", err);
      setRows(prev);
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

                {/* 별점 */}
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

                {/* 이미지 */}
                {(isEditing ? imagePreview : review.reviewImg) ? (
                  isEditing ? (
                    <ImgWrap>
                      {console.log(imagePreview)}
                      <ReviewImage
                        src={getImageSrc(imagePreview)}
                        alt="제품 리뷰 사진"
                      />
                      <ImgDeleteBtn
                        type="button"
                        aria-label="이미지 삭제"
                        onClick={handleDeleteImage}
                      >
                        ×
                      </ImgDeleteBtn>
                    </ImgWrap>
                  ) : (
                    <ReviewImage
                      src={getImageSrc(review.reviewImg)}
                      alt="제품 리뷰 사진"
                    />
                  )
                ) : null}

                {isEditing && (
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                )}

                {/* 내용 */}
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
