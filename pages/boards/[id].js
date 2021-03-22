import styled from "styled-components";
import MainHeader from "components/MainHeader";
import { PageHeader, PageMain } from "styles";
import { useRouter } from "next/router";

function BoardPage(props) {
   const router = useRouter();
   const isCompanySite = router.query.id === "company-site";
   const isUnknown = router.query.id === "unknown";
   return (
      <>
         <MainHeader />
         <PageMain>
            <PageHeader>
               <h3>
                  Job Source:{" "}
                  {(isCompanySite && "Company Sites") ||
                     (isUnknown && "Unknown") ||
                     props.board.name}
               </h3>
            </PageHeader>
            <Table>
               <thead>
                  <tr>
                     <th>ID</th>
                     <th>Title</th>
                     <th>Company</th>
                     <th>Link</th>
                  </tr>
               </thead>
               {props.opportunities?.length ? (
                  <tbody>
                     {props.opportunities.map((o) => {
                        return (
                           <tr key={o.id}>
                              <td>{o.id}</td>
                              <td>{o.title}</td>
                              <td>{o.company}</td>
                              <td>
                                 <a
                                    tabIndex={0}
                                    href={o.url}
                                    target="_blank"
                                    rel="noreferrer"
                                 >
                                    {!isCompanySite && !isUnknown
                                       ? props.board.root_domain
                                       : o.domain}
                                 </a>
                              </td>
                           </tr>
                        );
                     })}
                  </tbody>
               ) : (
                  <tfoot>
                     <tr>
                        <td>No jobs added</td>
                     </tr>
                  </tfoot>
               )}
            </Table>
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
      const { data } = await res.json();
      if (id === "company-site" || id === "unknown")
         return { props: { opportunities: data } };
      return { props: data };
   } catch (err) {
      return {
         props: {
            opportunities: []
         }
      };
   }
}

export default BoardPage;

const Table = styled.table`
   width: 100%;
   border-collapse: collapse;
   display: flex;
   flex-direction: column;
   justify-content: flex-start;
   font-size: 0.9em;
   line-height: 3;
   tr {
      display: flex;
      justify-content: space-between;
      border-style: solid;
      border-color: #bbb;
      border-width: 1px 0px;
   }
   td,
   th {
      width: 100%;
      padding: 0 0 0 20px;
      :first-child {
         flex-basis: 170px;
         padding: 0 0 0 5px;
         @media (min-width: 1000px) {
            flex-basis: 250px;
         }
      }
      :only-child {
         flex-basis: initial;
      }
      text-align: left;
      overflow: scroll;
      white-space: nowrap;
      a {
         text-decoration: none;
         color: blue;
      }
   }
   tfoot td {
      text-align: center;
   }
`;
