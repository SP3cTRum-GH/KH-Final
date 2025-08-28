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
import { getDealOne, productBid } from "../../api/productDealApi";
import { addCart } from "../../api/cartApi";
import { getCookie } from "../../util/cookieUtil";
import { useNavigate } from "react-router-dom";

const DealModal = ({ currentPrice, onConfirm, onCancel, param }) => {
  const [bidAmount, setBidAmount] = useState("");
  const navigate = useNavigate();

  const fd = {
    productNo: param.productNo,
    quantity: 1,
    size: "deal",
    price: bidAmount,
  };

  const handleBid = () => {
    const bidData = { productNo: fd.productNo, price: bidAmount };

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
    location.reload(true);
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
            onClick={async () => {
              // 부모에게 숫자만 전달하여 유효성 검사 결과를 받는다
              const ok = onConfirm ? onConfirm(Number(bidAmount)) : true;
              if (!ok) return; // 유효하지 않으면 종료 (API 호출 금지)

              await handleBid(); // API 실행
              onCancel?.(); // 성공 시 모달 닫기
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
