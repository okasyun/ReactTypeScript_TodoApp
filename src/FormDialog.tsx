import { FC } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";

type Props = {
  text: string;
  dialogOpen: boolean;
  onSubmit: () => void;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onToggleDialog: () => void;
};

export const FormDialog: FC<Props> = (props: Props) => {
  const { text, dialogOpen, onSubmit, onChange, onToggleDialog } = props;
  return (
    <Dialog fullWidth open={dialogOpen} onClose={onToggleDialog}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <div style={{ margin: "1em" }}>
          <TextField
            style={{
              width: "100%",
              fontSize: "16px",
              fontFamily:
                "-apple-system, BlinkMacSystemFont, Roboto, sans-serif",
            }}
            label="タスクを入力..."
            onChange={(e) => onChange(e)}
            value={text}
            autoFocus
          />
          <DialogActions>
            <Button color="secondary" onClick={onSubmit} aria-label="追加">
              追加
            </Button>
          </DialogActions>
        </div>
      </form>
    </Dialog>
  );
};
