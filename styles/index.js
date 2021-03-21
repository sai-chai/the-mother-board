import styled from "styled-components";

export const PageHeader = styled.header`
   font-size: 1.5em;
   margin-bottom: 20px;
`;

export const PageMain = styled.main`
   background: #d3d3d3;
   min-height: calc(100vh - 50px);
   padding: 20px 6vw;
`;

export const GridWrapper = styled.div`
   display: grid;
   grid-template-columns: repeat(1, 1fr);
   gap: 2vw;
   grid-auto-rows: minmax(200px, auto);
   @media (min-width: 500px) {
      grid-template-columns: repeat(2, 1fr);
   }
   @media (min-width: 1000px) {
      grid-template-columns: repeat(3, 1fr);
   }
`;

export const CardWrapper = styled.div`
   background: #fefefe;
   border-radius: 7px;
`;
