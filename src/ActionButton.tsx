import { FC } from "react";

import Fab from "@mui/material/Fab";
import CreateIcon from "@mui/icons-material/CreateRounded";
import DeleteIcon from "@mui/icons-material/DeleteRounded";
import { styled } from "@mui/material/styles";

type Props = {
  todos: Todo[];
  filter: Filter;
  alertOpen: boolean;
  dialogOpen: boolean;
  onToggleAlert: () => void;
  onToggleDialog: () => void;
};

const FabButton = styled(Fab)({
  position: "fixed",
  right: 15,
  bottom: 15,
});

export const ActionButton: FC<Props> = (props: Props) => {
  const {
    todos,
    filter,
    alertOpen,
    dialogOpen,
    onToggleAlert,
    onToggleDialog,
  } = props;
  const removed = todos.filter((todo) => todo.removed).length !== 0;
  return (
    <>
      {filter === "removed" ? (
        <FabButton
          aria-label="delete-button"
          color="secondary"
          onClick={onToggleAlert}
          disabled={!removed || alertOpen}
        >
          <DeleteIcon />
        </FabButton>
      ) : (
        <FabButton
          aria-label="add-button"
          color="secondary"
          onClick={props.onToggleDialog}
          disabled={props.filter === "checked" || props.dialogOpen}
        >
          <CreateIcon />
        </FabButton>
      )}
    </>
  );
};
