import styled from "styled-components";
import MainHeader from "components/MainHeader";
import BoardCard from "components/BoardCard";
import { PageHeader, PageMain } from "styles";

function IndexPage(props) {
   return (
      <>
         <MainHeader />
         <PageMain>
            <PageHeader>
               <h3>Job Sources</h3>
            </PageHeader>
            <GridWrapper>
               {props.boards.map((board) => (
                  <BoardCard key={board._id} board={board} />
               ))}
            </GridWrapper>
         </PageMain>
      </>
   );
}

IndexPage.getInitialProps = async (ctx) => {
   try {
      const { host } = ctx?.req.headers;
      const res = await fetch(`http://${host}/api/boards`);
      const json = await res.json();
      return { boards: json.data };
   } catch (err) {
      return {
         boards: []
      };
   }
};

export default IndexPage;

const GridWrapper = styled.div.attrs({
   role: "navigation"
})`
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
