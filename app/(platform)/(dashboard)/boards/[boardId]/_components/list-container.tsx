import { ListWithCards } from "@/types";
import { List } from "@prisma/client";
import { ListForm } from "./list-form";

interface ListContainerProps {
  boardId: string;
  data: ListWithCards[];
}

export const ListContainer = ({ boardId, data }: ListContainerProps) => {
  return (
    <ol>
      <ListForm boardId={boardId} />
      <div className="flex-shrink-0 w-1" />
    </ol>
  );
};
