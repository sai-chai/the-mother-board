import styled from "styled-components";
import Link from "next/link";

function BoardCard({ board }) {
   return (
      <Link href={`/boards/${board._id}`}>
         <CardWrapper role="button">
            <a tabIndex={0}>
               <CardAvatar>
                  <img src={board.logo_file} alt={board.name} />
               </CardAvatar>
               <CardBody>
                  <CardHeader rating={board.rating}>
                     <h4>{board.name}</h4>
                     <span>{board.rating}</span>
                  </CardHeader>
                  <p>{board.description}</p>
               </CardBody>
            </a>
         </CardWrapper>
      </Link>
   );
}

export default BoardCard;

const CardAvatar = styled.div`
   margin: 9px;
   img {
      width: 15vw;
      @media (min-width: 500px) {
         width: 10vw;
      }
      @media (min-width: 1000px) {
         width: 5vw;
      }
   }
`;

const CardBody = styled.div`
   width: calc(100% - 5vw - 9px);
   p {
      margin: 9px;
      font-size: 0.8rem;
      color: #606060;
      line-height: 1.5;
      text-overflow: ellipsis;
   }
`;

const CardHeader = styled.header`
   display: flex;
   justify-content: space-between;
   margin-left: 9px;
   h4 {
      margin-top: 7px;
      font-size: 1.1em;
   }
   span {
      font-size: 0.7em;
      color: ${({ rating }) => {
         switch (rating) {
            case "Great":
               return "#32CD32";
            case "Good":
               return "#98FB98";
            default:
               return "#FFD700";
         }
      }};
   }
`;

const CardWrapper = styled.div`
   background: #fefefe;
   border-radius: 7px;
   position: relative;
   z-index: 100;
   box-shadow: 0 0 10px #d3d3d3;
   a {
      display: flex;
      flex-wrap: nowrap;
      align-items: stretch;
      align-content: stretch;
      height: calc(100% - 16px);
      padding: 8px;
      :hover {
         cursor: pointer;
      }
      @media (min-width: 500px) {
         height: calc(100% - 24px);
         padding: 12px;
      }
      @media (min-width: 1000px) {
         height: calc(100% - 30px);
         padding: 15px;
      }
   }
`;
