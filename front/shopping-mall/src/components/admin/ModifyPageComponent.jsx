import React, { useState } from "react";
import {
    PageWrapper,
    Section,
    SectionTitle,
    FormGroup,
    Label,
    Input,
    Select,
    ButtonGroup,
    Button,
    SizeItem,
    ThumbnailWrapper,
    Thumbnail,
    RemoveButton,
    StockInput,
    SizeContainer,
    SelectButtons,
    SelectButton
} from "./ModifyPageStyle";

export default function ModifyPageComponent() {
    const [product, setProduct] = useState({
        name: "",
        salesType: "",
        category: "",
        price: "",
        stock: "",
        dealCount: "",
        dealCurrent: "",
        endDate: ""
    });

    const [previewImages, setPreviewImages] = useState([]);

    // 사이즈, 재고 상태
    const [category, setCategory] = useState("상의");
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [stocks, setStocks] = useState({});
    const [stockBySize, setStockBySize] = useState({});
    const [isAllShoesSelected, setIsAllShoesSelected] = useState(false); // 전체 선택 토글 상태

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
        if (name === "category") {
            setSelectedSizes([]); // 카테고리 변경 시 선택 사이즈 초기화
        }
    };

    // 카테고리별 사이즈 데이터
    const sizeOptions = {
        상의: ["XXS", "XS", "S", "M", "L", "XL", "XXL"],
        하의: ["25", "26", "27", "28", "29", "30", "32", "34", "36", "38"],
        신발: Array.from({ length: 21 }, (_, i) => (220 + i * 5).toString())
    };

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

    const handleSubmit = (e) => {
        e.preventDefault();

        const submitData = {
            productName: product.name,
            category: product.category,
            price: Number(product.price),
            type: product.salesType === "true",
            regDate: null,
            images: previewImages.map((img) => ({ img: null })), // 실제 업로드 로직은 서버 연동 시 변경
            sizes: selectedSizes.map((size) => ({
                productSize: size,
                stock: Number(product.stock) || 0
            })),
            ...(product.salesType === "false" && {
                dealCount: Number(product.dealCount),
                dealCurrent: Number(product.dealCurrent),
                endDate: product.endDate
            })
        };

        console.log("최종 전송 데이터:", submitData);
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

    // 신발 사이즈 전체 선택/해제
    const selectAllShoes = () => {
        setSelectedSizes(sizeOptions["신발"]);
    };

    const clearAllShoes = () => {
        setSelectedSizes([]);
        setStockBySize({});
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

    // 전체 선택/해제 토글
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
        <PageWrapper>
            <form onSubmit={handleSubmit}>
                {/* 기본 정보 */}
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
                            <Select name="salesType" value={product.salesType} onChange={handleChange}>
                                <option value="">선택</option>
                                <option value="true">일반 판매</option>
                                <option value="false">경매 판매</option>
                            </Select>
                        </Label>
                        <Label>
                            판매가
                            <Input name="price" value={product.price} onChange={handleChange} />
                        </Label>
                    </FormGroup>
                    {/* 경매 판매일 경우 추가 입력 필드 */}
                    {product.salesType === "false" && (
                        <FormGroup>
                            <Label>
                                상품 경매 입찰수
                                <Input
                                    type="number"
                                    name="dealCount"
                                    value={product.dealCount}
                                    onChange={handleChange}
                                    placeholder="입찰 횟수"
                                    disabled
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
                                    disabled
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


                {/* 카테고리 선택 */}
                <Section>
                    <SectionTitle>카테고리별 사이즈 관리</SectionTitle>
                    <FormGroup>
                        <Label>
                            카테고리 선택
                            <Select value={category} onChange={(e) => {
                                setCategory(e.target.value);
                                setSelectedSizes([]);
                                setStocks({});
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



                {/* 이미지 & 미디어 */}
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
                                <RemoveButton onClick={() => handleRemoveImage(index)}>×</RemoveButton>
                            </Thumbnail>
                        ))}
                    </ThumbnailWrapper>
                </Section>

                {/* 버튼 */}
                <ButtonGroup>
                    <Button type="button">임시 저장</Button>
                    <Button type="submit" variant="primary">수정 완료</Button>
                </ButtonGroup>
            </form>
        </PageWrapper>
    );
}