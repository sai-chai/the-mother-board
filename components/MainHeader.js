import styled from "styled-components";

const StyledHeader = styled.header`
   height: 50px;
   padding-left: 75px;
   font-family: Helvetica, Arial, sans-serif;
   box-shadow: 0px 5px 5px #808080;
   h1 {
      font-size: 1.6em;
   }
`;

export default function MainHeader() {
   return (
      <StyledHeader>
         <h1>The Mother Board</h1>
      </StyledHeader>
   );
}
