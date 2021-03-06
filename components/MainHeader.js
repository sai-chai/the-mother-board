import Link from "next/link";
import styled from "styled-components";

export default function MainHeader() {
   return (
      <StyledHeader>
         <Link href="/">
            <h1>
               <a tabIndex={0}>The Mother Board</a>
            </h1>
         </Link>
      </StyledHeader>
   );
}

const StyledHeader = styled.header`
   height: 50px;
   padding: 0 4vw;
   position: relative;
   z-index: 100;
   box-shadow: 0 5px 5px #d3d3d3;
   h1 {
      font-size: 1.8em;
      margin: 0;
      line-height: 50px;
   }
`;
