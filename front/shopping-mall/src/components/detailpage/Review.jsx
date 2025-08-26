// Review.jsx
import React, { useEffect, useState, useRef } from "react";
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

const getImageSrc = (img, nonce) => {
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
  const q = nonce ? (s.includes("?") ? `&t=${nonce}` : `?t=${nonce}`) : "";
  return `${API_SERVER_HOST}${s}${q}`;
};

async function urlToFile(url) {
  const res = await fetch(url, { credentials: "include" });
  const blob = await res.blob();
  const name = url.split("/").pop() || "image.jpg";
  return new File([blob], name, { type: blob.type || "image/jpeg" });
}

const Review = ({ reviewList }) => {
  const initialItems = reviewList?.dtoList ?? [];
  const [rows, setRows] = useState(initialItems);
  const [count, setCount] = useState(reviewList?.totalCount ?? 0);

  useEffect(() => {
    setRows(reviewList?.dtoList ?? []);
    setCount(reviewList?.totalCount ?? 0);
  }, [reviewList]);

  // cache-busting per review image
  const [imgNonceMap, setImgNonceMap] = useState({}); // { [reviewNo]: number }
  const imgRetryRef = useRef({}); // { [reviewNo]: 1 } to avoid infinite retries

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

    // 텍스트/숫자 필드
    fd.append("content", draftContent ?? "");
    fd.append("rating", String(draftRating ?? 0));

    if (review.productNo != null) {
      fd.append("productNo", String(review.productNo));
    }

    // 서버에서 memberId를 기대한다면 memberId로 전송
    const memberCookie = getCookie("member");
    if (memberCookie?.memberId) {
      fd.append("memberId", memberCookie.memberId);
    }

    // 이미지 처리
    // 1) 새 파일이 있으면 그 파일 업로드
    if (draftFile instanceof File) {
      fd.append("uploadFile", draftFile);
    } else if (!deleteImg) {
      // 2) 삭제가 아니고 기존 이미지가 있으면 기존 이미지를 파일로 변환하여 다시 업로드
      const current = review.reviewImg;
      if (current) {
        const absoluteUrl = String(current).startsWith("http")
          ? String(current)
          : `${API_SERVER_HOST}${current}`;
        try {
          const file = await urlToFile(absoluteUrl);
          fd.append("uploadFile", file);
        } catch (e) {
          console.error("urlToFile failed:", e);
        }
      }
    } else {
      // 3) 삭제 요청의 명시가 필요한 서버일 경우 플래그를 함께 보냄
      fd.append("deleteImage", "true");
    }

    try {
      await updateReview(reviewNo, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // 로컬 상태 반영
      setRows((prev) =>
        prev.map((r) => {
          const match = (r.reviewNo ?? r.id) === reviewNo;
          if (!match) return r;

          let nextImg = r.reviewImg;
          if (deleteImg) {
            nextImg = "";
          } else if (draftFile && imagePreview) {
            // 새 파일 미리보기 즉시 반영
            nextImg = imagePreview;
          }
          return {
            ...r,
            content: draftContent,
            rating: draftRating,
            reviewImg: nextImg,
          };
        })
      );

      // 캐시 버스터 갱신
      setImgNonceMap((prev) => ({ ...prev, [reviewNo]: Date.now() }));

      if (deleteImg || draftFile) {
        // No reload, just update local state as above
      } else {
        location.reload(true);
      }

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
                      <ReviewImage
                        src={getImageSrc(imagePreview, imgNonceMap[id])}
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
                      src={getImageSrc(review.reviewImg, imgNonceMap[id])}
                      alt="제품 리뷰 사진"
                      onError={() => {
                        if (!imgRetryRef.current[id]) {
                          imgRetryRef.current[id] = 1;
                          setImgNonceMap((prev) => ({
                            ...prev,
                            [id]: Date.now(),
                          }));
                        }
                      }}
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
