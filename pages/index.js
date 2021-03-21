import Link from "next/link";
import styled from "styled-components";
import MainHeader from "components/MainHeader";
import BoardCard from "components/BoardCard";
import { PageHeader, PageMain, GridWrapper } from "styles";

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
                  <BoardCard board={board} />
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
