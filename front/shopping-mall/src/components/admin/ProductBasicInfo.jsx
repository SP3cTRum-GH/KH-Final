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
          <Input
            type="text"
            name="productName"
            value={product.name}
            onChange={handleChange}
          />
        </Label>
      </FormGroup>

      {/* 일반 판매 */}
      {product.salesType === "false" && (
        <FormGroup>
          <Label>
            판매 타입
            <Select
              name="salesType"
              value={product.salesType}
              onChange={handleChange}
            >
              <option value="">선택</option>
              <option value="false">일반 판매</option>
              <option value="true">경매 판매</option>
            </Select>
          </Label>
          <Label>
            판매가
            <Input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
            />
          </Label>
        </FormGroup>
      )}

      {/* 경매 판매 */}
      {product.salesType === "true" && (
        <>
          <FormGroup>
            <Label>
              판매 타입
              <Select
                name="salesType"
                value={product.salesType}
                onChange={handleChange}
              >
                <option value="">선택</option>
                <option value="false">일반 판매</option>
                <option value="true">경매 판매</option>
              </Select>
            </Label>
            <Label>
              상품 경매 시작가
              <Input
                type="number"
                name="dealCurrent"
                value={product.dealCurrent}
                onChange={handleChange}
                placeholder="경매 시작가"
              />
            </Label>
          </FormGroup>

          <FormGroup>
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
        </>
      )}

      {/* 판매 타입 미선택 시 */}
      {product.salesType === "" && (
        <FormGroup>
          <Label>
            판매 타입
            <Select
              name="salesType"
              value={product.salesType}
              onChange={handleChange}
            >
              <option value="">선택</option>
              <option value="false">일반 판매</option>
              <option value="true">경매 판매</option>
            </Select>
          </Label>
        </FormGroup>
      )}
    </Section>
  );
}
