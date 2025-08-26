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
  existingImages = [],
}) {
  // 새로 업로드할 이미지 선택
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    setPreviewImages((prev) => [...prev, ...newImages]);
  };

  // 새 이미지 삭제
  const handleRemoveImage = (url) => {
    setPreviewImages((prev) => prev.filter((img) => img.url !== url));
  };

  // 기존 이미지 삭제
  const handleRemoveExistingImage = (url) => {
    setPreviewImages((prev) =>
      prev.filter((img) => img.url !== url && !img.file)
    );
  };

  // 기존 이미지 배열 (URL만)
  const existing = existingImages.filter(Boolean);

  // 새로 업로드된 이미지 배열
  const newUploads = previewImages.filter((img) => img.file);

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
        {/* 기존 이미지 렌더링 */}
        {existing.map((url, index) => (
          <Thumbnail key={`existing-${index}`}>
            <img src={url} alt={`existing-${index}`} />
            <RemoveButton onClick={() => handleRemoveExistingImage(url)}>
              ×
            </RemoveButton>
          </Thumbnail>
        ))}

        {/* 새로 업로드한 이미지 렌더링 */}
        {newUploads.map((img, index) => (
          <Thumbnail key={`new-${index}`}>
            <img src={img.url} alt={`new-${index}`} />
            <RemoveButton onClick={() => handleRemoveImage(img.url)}>
              ×
            </RemoveButton>
          </Thumbnail>
        ))}
      </ThumbnailWrapper>
    </Section>
  );
}
