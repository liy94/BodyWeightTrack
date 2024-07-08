import { Button } from "@mui/material";
import Link from "next/link";

const UpdateButton = ({ id }: { id: string }) => {
  return (
    <Link href={`/dashboard/update/${id}/edit`}>
      <Button>Update</Button>
    </Link>
  );
};

export default UpdateButton;
