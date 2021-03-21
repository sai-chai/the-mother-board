import Link from "next/link";
import styled from "styled-components";
import MainHeader from "components/MainHeader";

export default function IndexPage(props) {
   return (
      <>
         <MainHeader />
         <MainWrapper></MainWrapper>
      </>
   );
}

const MainWrapper = styled.main`
   background: #d3d3d3;
   min-height: calc(100vh - 75px);
`;
