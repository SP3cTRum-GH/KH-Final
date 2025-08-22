import styled from "styled-components";

export const CarouselContainer = styled.div`
  margin-top: 30px;
  width: 100%;
  height: 600px;
  overflow: hidden;

    @media (max-width: 500px) {
        height: 100%;
        /* height: 400px; */
    }
    
    div {
        position: relative;
        display: flex;
        transition: all 0.5s; 
    }
`

export const Cell = styled.div`

    img {
        width: 1200px;
        height: 500px;
        border-radius: 20px;

        @media (max-width: 430px) {
            width: 430px;
            height: auto;
            border-radius: 10px;
        }

        @media (max-width: 414px) {
            width: 414px;
            height: auto;
            border-radius: 10px;
        }

        @media (max-width: 390px) {
            width: 390px;
            height: auto;
            border-radius: 10px;
        }

        @media (max-width: 375px) {
            width: 375px;
            height: auto;
            border-radius: 10px;
        }
    }

    h3 {
        position: absolute;
        bottom: 100px;
        left: 50px;
        font-size: 70px;
        font-weight: 600;
        color: white;

        @media (max-width: 500px) {
            font-size: 30px;
            bottom: 80px;
        }
    }

    p {
        position: absolute;
        bottom: 50px;
        left: 50px;
        font-size: 50px;
        font-weight: 500;
        color: white;
        @media (max-width: 500px) {
            font-size: 20px;
            bottom: 40px;
        }
    }
`

export const PrevBtn = styled.button`
    position: absolute;
    top: -300px;
    left: -250px;
    margin-left: 250px;
    cursor: pointer;
    margin-top: 20px;
    padding: 5px;
    border-radius: 5px;
    border: 1px solid black;
    display: inline-block;
    background-color: transparent;
    border: none;
    font-size: 40px;
    color: #999;

    @media (max-width: 500px) {
        top: -190px;
    }
`

export const NextBtn = styled.button`
    position: absolute;
    top: -300px;
    right: 0px;
    cursor: pointer;
    margin-top: 20px;
    padding: 5px;
    border-radius: 5px;
    border: 1px solid black;
    display: inline-block;
    background-color: transparent;
    border: none;
    font-size: 40px;
    color: #999;

        @media (max-width: 500px) {
        top: -190px;
    }
`

export const CurrentValue = styled.div`
    position: absolute;
    top: -30px;
    left: 1150px;
    background-color: black;
    color: white;
    padding: 5px;
    border-radius: 100%;
    font-size: 12px;
    font-weight: 600;
    
`