import React, { useRef, useState } from "react";
import { postAdd } from "../../api/eventApi";
import useCustomMove from "../../hooks/useCustomMove";
import ImageUploader from "../admin/ImageUploader";
import {
  PageWrapper,
  Section,
  SectionTitle,
  FormGroup,
  Label,
  Input,
  ButtonGroup,
  Button,
} from "../admin/ModifyPageStyle";

const initState = {
  title: "",
  content: "",
  startDate: "",
  endDate: "",
  enable: false,
};

export default function AddComponent() {
  const [event, setEvent] = useState({ ...initState });
  const [result, setResult] = useState(null);
  const [previewImages, setPreviewImages] = useState([]);
  const { moveToEventList } = useCustomMove();

  const handleChangeEvent = (e) => {
    setEvent({
      ...event,
      [e.target.name]: e.target.value,
    });
  };

  // 이미지 삭제 처리
  const handleRemoveImage = (url) => {
    setPreviewImages((prev) => prev.filter((img) => img.url !== url));
  };

  const handleClickAdd = async () => {
    const formData = new FormData();

    // LocalDateTime 형식 변환
    const formatDateTime = (dateStr) => {
      if (!dateStr) return null;
      const date = new Date(dateStr);
      const pad = (num) => String(num).padStart(2, "0");
      const year = date.getFullYear();
      const month = pad(date.getMonth() + 1);
      const day = pad(date.getDate());
      const hours = pad(date.getHours());
      const minutes = pad(date.getMinutes());
      const seconds = pad(date.getSeconds());
      return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
    };

    formData.append("title", event.title);
    formData.append("content", event.content);
    formData.append("startDate", formatDateTime(event.startDate));
    formData.append("endDate", formatDateTime(event.endDate));
    formData.append("enable", event.enable); // 새 이벤트는 기본적으로 enable = false

    // 새 업로드된 파일만 FormData에 추가
    previewImages
      .filter(
        (img) => img.type === "local" || (img.type === "file" && img.file)
      )
      .forEach((img) => formData.append("uploadFiles", img.file));

    // ====== FormData 내용 콘솔 확인 ======
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }
    // ====================================

    try {
      const data = await postAdd(formData); // axios 호출
      setResult(data.result);
      moveToEventList();
    } catch (err) {
      console.error("등록 에러:", err);
    }
  };

  return (
    <PageWrapper>
      <Section>
        <SectionTitle>기본 정보</SectionTitle>
        <FormGroup>
          <Label>
            이벤트 제목
            <Input
              name="title"
              type="text"
              value={event.title}
              onChange={handleChangeEvent}
              placeholder="이벤트 제목을 입력하세요"
            />
          </Label>
        </FormGroup>

        <FormGroup>
          <Label>
            내용
            <Input
              name="content"
              value={event.content}
              rows={5}
              onChange={handleChangeEvent}
              placeholder="이벤트 내용을 입력하세요"
            />
          </Label>
        </FormGroup>

        <FormGroup>
          <Label>
            시작일
            <Input
              name="startDate"
              type="date"
              value={event.startDate}
              onChange={handleChangeEvent}
            />
          </Label>
        </FormGroup>

        <FormGroup>
          <Label>
            종료일
            <Input
              name="endDate"
              type="date"
              value={event.endDate}
              onChange={handleChangeEvent}
            />
          </Label>
        </FormGroup>
      </Section>

      <ImageUploader
        previewImages={previewImages}
        setPreviewImages={setPreviewImages}
        onRemoveImage={handleRemoveImage}
      />

      <ButtonGroup>
        <Button type="button" onClick={handleClickAdd}>
          저장
        </Button>
      </ButtonGroup>
    </PageWrapper>
  );
}
