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

export default function ImageUploader({ previewImages, setPreviewImages }) {
  // 이미지 선택
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    setPreviewImages((prev) => [...prev, ...newImages]);
  };

  // 이미지 삭제
  const handleRemoveImage = (index) => {
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
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
        {previewImages.map((img, index) => (
          <Thumbnail key={index}>
            <img src={img.url} alt={`preview-${index}`} />
            <RemoveButton onClick={() => handleRemoveImage(index)}>
              ×
            </RemoveButton>
          </Thumbnail>
        ))}
      </ThumbnailWrapper>
    </Section>
  );
}
