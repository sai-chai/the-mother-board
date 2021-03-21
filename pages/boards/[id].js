import styled from "styled-components";
import MainHeader from "components/MainHeader";
import { PageHeader, PageMain } from "styles";

function IndexPage(props) {
   return (
      <>
         <MainHeader />
         <PageMain>
            <PageHeader>
               <h3>Job Sources</h3>
            </PageHeader>
         </PageMain>
      </>
   );
}

export async function getServerSideProps(context) {
   try {
      const {
         params: { id },
         req: {
            headers: { host }
         }
      } = context;
      const res = await fetch(`http://${host}/api/boards/${id}`);
      const json = await res.json();
      return { props: { opportunities: json.data } };
   } catch (err) {
      return {
         props: {
            boards: []
         }
      };
   }
}

export default IndexPage;
