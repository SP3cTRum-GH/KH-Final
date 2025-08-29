import React from "react";
import {
  Section,
  SectionTitle,
  FormGroup,
  Label,
  Input,
  ThumbnailWrapper,
  Thumbnail,
  RemoveButton,
} from "./ModifyPageStyle";

export default function ImageUploader({
  previewImages,
  setPreviewImages,
  onRemoveImage,
}) {
  // 새 이미지 추가
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      type: "file",
      file,
      url: URL.createObjectURL(file),
    }));
    setPreviewImages((prev) => {
      const updated = [...prev, ...newImages];
      console.log("새 이미지 추가 후: ", updated);
      return updated;
    });
  };

  return (
    <Section>
      <SectionTitle>이미지 업로드</SectionTitle>
      <FormGroup>
        <Label>
          이미지 선택
          <Input type="file" multiple onChange={handleImageChange} />
        </Label>
      </FormGroup>
      <ThumbnailWrapper>
        {previewImages.map((img, idx) => (
          <Thumbnail key={idx}>
            <img src={img.url} alt={`preview-${idx}`} />
            <RemoveButton type="button" onClick={() => onRemoveImage(img.url)}>
              ×
            </RemoveButton>
          </Thumbnail>
        ))}
      </ThumbnailWrapper>
    </Section>
  );
}
