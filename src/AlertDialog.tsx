import { FC } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

import { styled } from "@mui/material/styles";
import { ButtonGroup } from "@mui/material";

type Props = {
  alertOpen: boolean;
  onEmpty: () => void;
  onToggleAlert: () => void;
};

const Alert = styled(Dialog)(() => ({
  fontFamily: "-apple-system, BlinkMacSystemFont, Roboto, sans-serif",
}));

export const AlertDialog: FC<Props> = (props: Props) => {
  const { alertOpen, onToggleAlert, onEmpty } = props;
  return (
    <Alert onClose={onToggleAlert} open={alertOpen}>
      <DialogTitle>アラート</DialogTitle>
      <DialogContent>
        <DialogContent>本当にゴミ箱を完全に空にしますか？</DialogContent>
        <DialogContentText>この操作は取り消しできません。</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => onToggleAlert()}
          color="primary"
          aria-label="cancel"
        >
          キャンセル
        </Button>
        <Button
          onClick={() => {
            onToggleAlert();
            onEmpty();
          }}
          color="secondary"
          aria-label="ok"
          autoFocus
        >
          OK
        </Button>
      </DialogActions>
    </Alert>
  );
};
