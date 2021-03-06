import styled from "styled-components";

export default function Loading() {
    return (
        <>
            <Load>
                <div></div>
                <div></div>
                <div></div>
            </Load>
        </>
    );
}

const Load = styled.div`
    width: 3.5em;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
    div {
        width: 0.8em;
        height: 0.8em;
        border-radius: 50%;
        background-color: white;
        animation: fade 0.8s ease-in-out alternate infinite;
    }
    div:nth-of-type(1) {
        animation-delay: -0.4s;
    }
    div:nth-of-type(2) {
        animation-delay: -0.2s;
    }
    @keyframes fade {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
`;