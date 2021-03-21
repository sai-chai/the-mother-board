import styled from "styled-components";
import Link from "next/link";
import { CardWrapper } from "styles";

function BoardCard(props) {
   return (
      <Link href={`/boards/${props.board._id}`}>
         <CardWrapper />
      </Link>
   );
}

export default BoardCard;
