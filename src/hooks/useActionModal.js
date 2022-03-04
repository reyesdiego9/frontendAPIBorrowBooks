import { useState } from "react";

export const useActionModal = () => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  return {
    open,
    handleClose,
  };
};
