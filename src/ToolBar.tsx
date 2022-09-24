import { FC } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

type Props = {
  filter: Filter;
  onToggleDrawer: () => void;
};

export const ToolBar: FC<Props> = (props: Props) => {
  const { filter, onToggleDrawer } = props;
  const translater = (arg: Filter) => {
    switch (arg) {
      case "all":
        return "すべてのタスク";
      case "unchecked":
        return "現在のタスク";
      case "checked":
        return "完了したタスク";
      case "removed":
        return "ゴミ箱";
      default:
        "TODO";
    }
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={onToggleDrawer}
          >
            <MenuIcon />
          </IconButton>

          <Typography>{translater(filter)}</Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};