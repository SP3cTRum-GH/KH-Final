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

    // 모든 이미지 업로드
    previewImages.forEach((img) => {
      formData.append("uploadFiles", img.file);
    });

    try {
      const data = await postAdd(formData);
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
      />

      <ButtonGroup>
        <Button type="button" onClick={handleClickAdd}>
          저장
        </Button>
      </ButtonGroup>
    </PageWrapper>
  );
}
