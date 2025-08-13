import React, { useMemo, useState } from "react";
import {
  Section,
  SectionTitle,
  FormGroup,
  Label,
  Select,
  SizeContainer,
  SizeItem,
  StockInput,
  SelectButtons,
  SelectButton,
} from "./ModifyPageStyle";

/**
 * props:
 *  - product, setProduct
 *  - selectedSizes, setSelectedSizes
 *  - stockBySize, setStockBySize
 */
export default function CategorySizeManager({
  product,
  setProduct,
  selectedSizes,
  setSelectedSizes,
  stockBySize,
  setStockBySize,
}) {
  const [isAllShoesSelected, setIsAllShoesSelected] = useState(false);

  // 화면용 라벨 ↔ 서버로 보낼 코드값
  const categories = [
    { code: "top", label: "상의" },
    { code: "bottom", label: "하의" },
    { code: "shoes", label: "신발" },
  ];

  // 카테고리별 사이즈 옵션 (코드 기준)
  const sizeOptions = useMemo(
    () => ({
      top: ["XXS", "XS", "S", "M", "L", "XL", "XXL"],
      bottom: ["25", "26", "27", "28", "29", "30", "32", "34", "36", "38"],
      shoes: Array.from({ length: 21 }, (_, i) => String(220 + i * 5)),
    }),
    []
  );

  const currentCategory = product?.category || ""; // top | bottom | shoes | ""

  // 카테고리 변경 → product에 바인딩 + 사이즈/재고 초기화
  const handleCategoryChange = (e) => {
    const nextCode = e.target.value; // top|bottom|shoes
    setProduct((prev) => ({ ...prev, category: nextCode }));
    setSelectedSizes([]);
    setStockBySize({});
    setIsAllShoesSelected(false);
  };

  // 사이즈 토글
  const toggleSize = (size) => {
    if (selectedSizes.includes(size)) {
      setSelectedSizes(selectedSizes.filter((s) => s !== size));
      setStockBySize((prev) => {
        const next = { ...prev };
        delete next[size];
        return next;
      });
    } else {
      setSelectedSizes([...selectedSizes, size]);
      setStockBySize((prev) => ({ ...prev, [size]: prev?.[size] ?? 0 }));
    }
  };

  // 재고 입력 (숫자만)
  const handleStockChange = (size, value) => {
    const onlyNum = String(value).replace(/[^0-9]/g, "");
    const num = onlyNum === "" ? 0 : parseInt(onlyNum, 10);
    setStockBySize({ ...stockBySize, [size]: num });
  };

  // 신발 빠른 선택
  const selectShoes10 = () => {
    const list = sizeOptions.shoes.filter((s) => Number(s) % 10 === 0);
    setSelectedSizes(list);
  };

  const selectShoes5 = () => {
    const list = sizeOptions.shoes.filter((s) => Number(s) % 10 !== 0);
    setSelectedSizes(list);
  };

  const toggleAllShoes = () => {
    if (isAllShoesSelected) {
      setSelectedSizes([]);
      setStockBySize({});
    } else {
      setSelectedSizes(sizeOptions.shoes);
      setStockBySize(
        Object.fromEntries(
          sizeOptions.shoes.map((s) => [s, stockBySize?.[s] ?? 0])
        )
      );
    }
    setIsAllShoesSelected(!isAllShoesSelected);
  };

  const availableSizes = currentCategory ? sizeOptions[currentCategory] : [];

  return (
    <Section>
      <SectionTitle>카테고리별 사이즈 관리</SectionTitle>

      {/* 카테고리 선택 (제어 컴포넌트) */}
      <FormGroup>
        <Label>
          카테고리 선택
          <Select value={currentCategory} onChange={handleCategoryChange}>
            <option value="" disabled>
              카테고리 선택
            </option>
            {categories.map((c) => (
              <option key={c.code} value={c.code}>
                {c.label}
              </option>
            ))}
          </Select>
        </Label>
      </FormGroup>

      {/* 사이즈 관리 */}
      <Label>사이즈 관리</Label>
      {currentCategory === "shoes" && (
        <SelectButtons>
          <SelectButton onClick={toggleAllShoes} type="button">
            {isAllShoesSelected ? "전체 해제" : "전체 선택"}
          </SelectButton>
          <SelectButton onClick={selectShoes10} type="button">
            10단위 선택
          </SelectButton>
          <SelectButton onClick={selectShoes5} type="button">
            5단위 선택
          </SelectButton>
        </SelectButtons>
      )}

      <SizeContainer>
        {availableSizes.map((size) => (
          <SizeItem key={size}>
            <label>
              <input
                type="checkbox"
                checked={selectedSizes.includes(size)}
                onChange={() => toggleSize(size)}
              />
              {size}
            </label>
            {selectedSizes.includes(size) && (
              <StockInput
                type="number"
                placeholder="재고"
                value={stockBySize[size] ?? 0}
                onChange={(e) => handleStockChange(size, e.target.value)}
              />
            )}
          </SizeItem>
        ))}
      </SizeContainer>
    </Section>
  );
}
