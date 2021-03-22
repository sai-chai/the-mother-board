import styled from "styled-components";
import MainHeader from "components/MainHeader";
import BoardCard from "components/BoardCard";
import { PageHeader, PageMain } from "styles";

const genericLogoUri =
   "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Globe_icon.svg/200px-Globe_icon.svg.png";
const companyDesc = "Job postings directly from company websites.";
const unknownDesc = "Job postings with no clear indication of their source.";

function IndexPage(props) {
   return (
      <>
         <MainHeader />
         <PageMain>
            <PageHeader>
               <h3>Job Sources</h3>
            </PageHeader>
            <GridWrapper>
               <BoardCard
                  board={{
                     _id: "company-site",
                     logo_file: genericLogoUri,
                     name: "Company Site",
                     description: companyDesc,
                     rating: "N/A"
                  }}
               />
               {props.boards.map((board) => (
                  <BoardCard key={board._id} board={board} />
               ))}
               <BoardCard
                  board={{
                     _id: "unknown",
                     logo_file: genericLogoUri,
                     name: "Unknown",
                     description: unknownDesc,
                     rating: "N/A"
                  }}
               />
            </GridWrapper>
         </PageMain>
      </>
   );
}

export async function getServerSideProps(ctx) {
   try {
      const { host } = ctx?.req.headers;
      const res = await fetch(`http://${host}/api/boards`);
      const json = await res.json();
      return { props: { boards: json.data } };
   } catch (err) {
      return {
         props: {
            boards: []
         }
      };
   }
}

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
