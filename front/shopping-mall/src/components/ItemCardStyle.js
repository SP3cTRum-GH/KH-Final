import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 50px;
`;

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin-left: 100px;

  @media (max-width: 430px) {
    margin-left: 40px;
    gap: 50px;
  }

    @media (max-width: 414px) {
    margin-left: 25px;
    gap: 50px;
  }

  @media (max-width: 390px) {
    margin-left: 10px;
    gap: 50px;
  }

    @media (max-width: 375px) {
    margin-left: 5px;
    gap: 40px;
  }


`;

export const ProductContainer = styled.div`
    width: 200px;
    cursor: pointer;
    

    img {
        width: 200px;
        height: 200px;
        background-size: cover;
        background-position: center;
        background-image: none;
    }

    div {

        h4 {
            padding: 5px 0;
            font-weight: 600;
        }
    }

    @media (max-width: 500px) {
        width: 130px;
        cursor: pointer;

    img {
        width: 200px;
        height: 200px;
        background-size: cover;
        background-position: center;
        background-image: none;
    }

    div {

        h4 {
            padding: 5px 0;
            font-weight: 600;
        }
    }
  }
`
export const Wrap = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    button {
        height: 30px;
        margin-left: 5px;
        cursor: pointer;
    }
`