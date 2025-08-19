import styled from 'styled-components';

export const CartContainer = styled.div`
  display: flex;
  padding: 40px 80px;
  gap: 40px;
  font-family: 'Apple SD Gothic Neo', sans-serif;

  @media (max-width: 768px) {
    padding: 0 20px
  }
`;

export const LeftSection = styled.div`
  flex: 3;
`;

export const RightSection = styled.div`
  flex: 1.2;
  border-left: 1px solid #ddd;
  padding-left: 20px;

  @media (max-width: 768px) {
        display: none;
    }
`;

export const MobileSection = styled.div`
    display: none;

    @media (max-width: 768px) {
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: fixed;
        bottom: 0;
        left: 0;
        width: 94%;
        padding: 1rem 1.5rem;
        background-color: #fff;
        border-top: 1px solid #ddd;
        z-index: 999;

        button {
            flex: 1;
            margin: 0 1rem;
            padding: 0.75rem;
            background-color: black;
            color: white;
            border: none;
            border-radius: 6px;
            font-size: 1rem;
        }

        span {
            font-size: 0.9rem;
            font-weight: 500;
        }
    }
`;

export const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
`;

export const DeliveryGroup = styled.div`
  margin-bottom: 30px;
`;

export const ItemBox = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 20px 0;
  border-bottom: 1px solid #eaeaea;
`;

export const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  margin-right: 20px;
`;

export const ItemImage = styled.img`
  width: 100px;
  height: 130px;
  object-fit: cover;
  margin-right: 20px;
`;

export const ItemInfo = styled.div`
  flex: 1;
`;

export const ItemName = styled.p`
  font-size: 16px;
  margin-bottom: 8px;
`;

export const ItemOptions = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

export const OptionButton = styled.button`
  padding: 6px 12px;
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  cursor: pointer;
`;

export const Price = styled.div`
  font-weight: bold;
  font-size: 16px;
  color: #222;
`;

export const OriginalPrice = styled.span`
  text-decoration: line-through;
  color: #aaa;
  font-size: 14px;
  margin-right: 8px;
`;

export const SummaryBox = styled.div`
  font-size: 15px;
  line-height: 2;
`;

export const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const PurchaseButton = styled.button`
  width: 100%;
  background-color: black;
  color: white;
  padding: 16px;
  font-size: 16px;
  font-weight: bold;
  margin-top: 20px;
  cursor: pointer;
`;

export const Notice = styled.div`
  font-size: 13px;
  color: #777;
  margin-top: 10px;
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  // 추가
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
  position: relative;
`;

export const ModalHeader = styled.h2`
  margin-top: 0;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  font-size: 20px;
  background: none;
  border: none;
  cursor: pointer;
`;

export const Dropdown = styled.select`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 15px;
`;

export const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #f5f5f5;
  padding: 12px 16px;
  border-radius: 6px;
  font-size: 16px;
  margin-bottom: 20px;

  button {
    width: 32px;
    height: 32px;
    font-size: 18px;
    background-color: white;
    border: 1px solid #ccc;
    cursor: pointer;
    border-radius: 4px;
  }

  span {
    font-size: 16px;
    margin: 0 10px;
    width: 20px;
    text-align: center;
  }
`;

export const PriceDisplay = styled.div`
  text-align: right;
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 24px;
`;

export const ModalActions = styled.div`
  display: flex;
  justify-content: space-between;

  button {
    width: 48%;
    padding: 12px;
    font-size: 15px;
    border-radius: 6px;
    cursor: pointer;
  }

  button:first-child {
    border: 1px solid #ccc;
    background-color: white;
    color: black;
  }

  button:last-child {
    background-color: #eaeaea;
    border: none;
    color: #999;
    font-weight: bold;
  }

  button:last-child:not(:disabled) {
    background-color: blue;
    color: white;
  }
`;

export const FilterBar = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  margin: 8px 0 16px;
  flex-wrap: wrap;
`;

export const FilterButton = styled.button`
  padding: 8px 12px;
  border: 1px solid #ddd;
  background: #fff;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  line-height: 1;

  &[data-active='true'] {
    background: #111;
    color: #fff;
    border-color: #111;
  }
`;

export const SectionHeader = styled.h3`
  margin: 16px 0 8px;
  font-size: 18px;
  font-weight: 600;
`;

export const CartDeleteButton = styled.p`
  font-size: 14px;
  cursor: pointer;
  color: rgb(136, 136, 136)
`