import { Dialog, DialogContent, DialogTitle } from "@mui/material";

export interface EditDialogProps {
  open: boolean;
  onClose: () => void;
}
export default function EditDialog(props: EditDialogProps) {
  const { open, onClose } = props;

  <Dialog open={open} onClose={onClose}>
    <DialogTitle>Edit Weight</DialogTitle>
    <DialogContent></DialogContent>
  </Dialog>;
}
