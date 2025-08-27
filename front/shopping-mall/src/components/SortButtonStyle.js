import styled from "styled-components";

export const BtnContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    /* margin: 0 100px; */
    margin-bottom: 10px;
    margin-left: 10px;
    margin-top: 10px;

    @media (max-width: 500px) {
        display: flex;
        flex-direction: row;
        gap: 10px;
        margin-top: 10px;
    }

    div {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    p {
        cursor: pointer;
        border: 1px solid #ccc;
        padding: 8px;
        border-radius: 5px;
        color: gray;
        white-space: nowrap;
    }

    p:hover{
        cursor: pointer;
        border: 1px solid #ccc;
        padding: 8px;
        border-radius: 5px;
        background-color: black;
        color: white;
    }
`

export const SortBtn = styled.div`
    margin-right: 20px;
    display: flex;
`