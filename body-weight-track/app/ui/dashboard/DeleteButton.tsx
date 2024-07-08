import { Button } from "@mui/material";
import { deleteWeight } from "@/app/lib/actions";

const DeleteButton = ({ id }: { id: string }) => {
  const deleteWeightId = deleteWeight.bind(null, id);

  return (
    <form action={deleteWeightId}>
      <Button type="submit">Delete</Button>
    </form>
  );
};

export default DeleteButton;
