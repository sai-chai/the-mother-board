import styled from "styled-components";

export default function MainHeader() {
   return (
      <StyledHeader>
         <h1>The Mother Board</h1>
      </StyledHeader>
   );
}

const StyledHeader = styled.header`
   height: 50px;
   padding: 0 4vw;
   position: relative;
   z-index: 100;
   box-shadow: 0 5px 5px #b0b0b0;
   h1 {
      font-size: 1.8em;
      margin: 0;
      line-height: 50px;
   }
`;
