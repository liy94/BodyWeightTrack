import { Dialog } from "@mui/material";

export interface createDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function CreateDialog(props: createDialogProps) {
  const { open, onClose } = props;
  return (
    <Dialog open={open} onClose={onClose}>
      hey
    </Dialog>
  );
}
