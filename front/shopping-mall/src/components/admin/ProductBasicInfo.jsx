import React from "react";
import {
  Section,
  SectionTitle,
  FormGroup,
  Label,
  Input,
  Select,
} from "./ModifyPageStyle";

export default function ProductBasicInfo({ product, setProduct }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  return (
    <Section>
      <SectionTitle>기본 정보</SectionTitle>
      <FormGroup>
        <Label>
          상품명
          <Input name="name" value={product.name} onChange={handleChange} />
        </Label>
      </FormGroup>
      <FormGroup>
        <Label>
          판매 타입
          <Select
            name="salesType"
            value={product.salesType}
            onChange={handleChange}
            disabled
          >
            <option value="">선택</option>
            <option value="false">일반 판매</option>
            <option value="true">경매 판매</option>
          </Select>
        </Label>
        <Label>
          판매가
          <Input name="price" value={product.price} onChange={handleChange} />
        </Label>
      </FormGroup>
      {/* 경매 판매일 경우 추가 입력 필드 */}
      {product.salesType === "true" && (
        <FormGroup>
          <Label>
            상품 경매 입찰수
            <Input
              type="number"
              name="dealCount"
              value={product.dealCount}
              onChange={handleChange}
              placeholder="입찰 횟수"
            />
          </Label>
          <Label>
            상품 경매 입찰가
            <Input
              type="number"
              name="dealCurrent"
              value={product.dealCurrent}
              onChange={handleChange}
              placeholder="경매 시작가"
            />
          </Label>
          <Label>
            상품 경매 종료일
            <Input
              type="date"
              name="endDate"
              value={product.endDate}
              onChange={handleChange}
            />
          </Label>
        </FormGroup>
      )}
    </Section>
  );
}
