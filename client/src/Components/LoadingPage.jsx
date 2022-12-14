import React from 'react';
import styled from 'styled-components';

const LoadingDiv = styled.div`
  font-weight: bold;
  display: flex;
  justify-content: center;
  flex-direction: row;
  font-size: 2rem;
  width: 100%;
  height: 100vh;
  position: fixed;
  background: rgba(255, 255, 255)
      url("https://media.giphy.com/media/8agqybiK5LW8qrG3vJ/giphy.gif") center
      no-repeat;
`;


export default function LoadingPage() {
  return (
    <LoadingDiv>
      Loading...
    </LoadingDiv>

  )
}