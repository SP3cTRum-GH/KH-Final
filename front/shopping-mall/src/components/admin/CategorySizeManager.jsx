import React, { useState } from "react";
import { Section, SectionTitle, FormGroup, Label, Select, SizeContainer, SizeItem, StockInput, SelectButtons, SelectButton } from "./ModifyPageStyle";

export default function CategorySizeManager({ product, selectedSizes, setSelectedSizes, stockBySize, setStockBySize }) {
    const [category, setCategory] = useState("상의");
    const [isAllShoesSelected, setIsAllShoesSelected] = useState(false); // 전체 선택 토글 상태

    // 카테고리별 사이즈 데이터
    const sizeOptions = {
        상의: ["XXS", "XS", "S", "M", "L", "XL", "XXL"],
        하의: ["25", "26", "27", "28", "29", "30", "32", "34", "36", "38"],
        신발: Array.from({ length: 21 }, (_, i) => (220 + i * 5).toString())
    };

    // 사이즈 선택/해제
    const toggleSize = (size) => {
        if (selectedSizes.includes(size)) {
            setSelectedSizes(selectedSizes.filter((s) => s !== size));
            setStockBySize((prev) => {
                const newStock = { ...prev };
                delete newStock[size];
                return newStock;
            });
        } else {
            setSelectedSizes([...selectedSizes, size]);
        }
    };

    // 재고 입력 변경
    const handleStockChange = (size, value) => {
        setStockBySize({ ...stockBySize, [size]: value });
    };

    // 10단위 & 5단위 선택
    const selectShoes10 = () => {
        const sizes10 = sizeOptions["신발"].filter((size) => size % 10 === 0);
        setSelectedSizes(sizes10);
    };

    const selectShoes5 = () => {
        const sizes5 = sizeOptions["신발"].filter((size) => size % 10 !== 0);
        setSelectedSizes(sizes5);
    };

    const toggleAllShoes = () => {
        if (isAllShoesSelected) {
            setSelectedSizes([]);
            setStockBySize({});
        } else {
            setSelectedSizes(sizeOptions["신발"]);
        }
        setIsAllShoesSelected(!isAllShoesSelected);
    };

    return (
        <Section>
            {/* 카테고리 선택 */}
            <SectionTitle>카테고리별 사이즈 관리</SectionTitle>
            <FormGroup>
                <Label>
                    카테고리 선택
                    <Select value={category} onChange={(e) => {
                        setCategory(e.target.value);
                        setSelectedSizes([]);
                        setStockBySize({});
                        setIsAllShoesSelected(false);
                    }}>
                        <option value="상의">상의</option>
                        <option value="하의">하의</option>
                        <option value="신발">신발</option>
                    </Select>
                </Label>
            </FormGroup>

            {/* 사이즈 관리 */}
            <Label>사이즈 관리</Label>
            {category === "신발" && (
                <SelectButtons>
                    <SelectButton onClick={toggleAllShoes} type="button">
                        {isAllShoesSelected ? "전체 해제" : "전체 선택"}
                    </SelectButton>
                    <SelectButton onClick={selectShoes10} type="button">10단위 선택</SelectButton>
                    <SelectButton onClick={selectShoes5} type="button">5단위 선택</SelectButton>
                </SelectButtons>
            )}
            <SizeContainer>
                {sizeOptions[category].map((size) => (
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
                                value={stockBySize[size] || ""}
                                onChange={(e) => handleStockChange(size, e.target.value)}
                            />
                        )}
                    </SizeItem>
                ))}
            </SizeContainer>
        </Section>
    )
}