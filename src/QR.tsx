import { FC } from "react";
import { QRCode } from "react-qrcode-logo";

import Backdrop from "@mui/material/Backdrop";
import { styled } from "@mui/material/styles";

const TodoBackdrop = styled(Backdrop)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  color: "#fff",
  backgroundColor: "rgba(0, 0, 0, 0.8)",
}));

type Props = {
  open: boolean;
  onClose: () => void;
};

export const QR: FC<Props> = (props: Props) => {
  const { open, onClose } = props;
  return (
    <TodoBackdrop open={open} onClick={onClose}>
      <QRCode value="https://sprout2000.github.io/todo" />
    </TodoBackdrop>
  );
};
