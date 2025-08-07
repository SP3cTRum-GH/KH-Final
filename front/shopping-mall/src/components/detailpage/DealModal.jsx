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

const DealModal = ({ currentPrice = 10000, onConfirm, onCancel }) => {
  const [bidAmount, setBidAmount] = useState("");

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
          <span> 원</span>
        </div>
        <ButtonRow>
          <Button
            className="confirm"
            onClick={() => onConfirm && onConfirm(Number(bidAmount))}
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
