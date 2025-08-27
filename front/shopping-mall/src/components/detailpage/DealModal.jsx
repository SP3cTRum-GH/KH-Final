import React, { useState } from "react";
import {
  ModalOverlay,
  ModalContent,
  Title,
  PriceLabel,
  Input,
  ButtonRow,
  Button,
} from "./DealModalStyle";
import { productBid } from "../../api/productDealApi";
import { addCart } from "../../api/cartApi";
import { getCookie } from "../../util/cookieUtil";
import { useNavigate } from "react-router-dom";

const DealModal = ({ currentPrice = 10000, onConfirm, onCancel, param }) => {
  const [bidAmount, setBidAmount] = useState("");
  const navigate = useNavigate();

  const fd = {
    productNo: param.productNo,
    quantity: 1,
    size: "deal",
  };

  const handleBid = () => {
    const bidData = { productNo: fd.productNo, price: bidAmount };
    console.log(bidData);

    productBid(bidData)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
        return;
      });

    addCart(getCookie("member").memberId, fd)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
        return;
      });

    navigate("/cart");
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <Title>경매 참여하기</Title>
        <PriceLabel>현재 최고가: {currentPrice.toLocaleString()}원</PriceLabel>
        <div>
          <Input
            type="number"
            placeholder="입찰가를 입력하세요"
            value={bidAmount}
            onChange={(e) => setBidAmount(e.target.value)}
          />
        </div>
        <ButtonRow>
          <Button
            className="confirm"
            onClick={() => {
              onConfirm?.(fd); // 부모 콜백 실행
              handleBid(); // API 실행
            }}
          >
            입찰
          </Button>
          <Button className="cancel" onClick={onCancel}>
            취소
          </Button>
        </ButtonRow>
      </ModalContent>
    </ModalOverlay>
  );
};

export default DealModal;
