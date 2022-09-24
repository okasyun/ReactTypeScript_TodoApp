import React, { useState, useEffect } from "react";
import localforage from "localforage";
import { isTodos } from "./lib/isTodos";
import GlobalStyles from "@mui/material/GlobalStyles";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { indigo, pink } from "@mui/material/colors";

import { QR } from "./QR";
import { ToolBar } from "./ToolBar";
import { SideBar } from "./SideBar";
import { AlertDialog } from "./AlertDialog";
import { ActionButton } from "./ActionButton";
import { FormDialog } from "./FormDialog";
import { TodoItem } from "./TodoItem";

const theme = createTheme({
  palette: {
    primary: {
      main: indigo[500],
      light: "#757de8",
      dark: "#002984",
    },
    // ついでにセカンダリーカラーもv4に戻す
    secondary: {
      main: pink[500],
      light: "ff6090",
      dark: "#b0003a",
    },
  },
});

export const App = () => {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>("all");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [qrOpen, setQrOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);

  useEffect(() => {
    localforage
      .getItem("todo-20200101")
      .then((values) => isTodos(values) && setTodos(values))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    localforage
      .setItem("todo-20200101", todos)
      .catch((err) => console.error(err));
  }, [todos]);

  const onToggleAlert = () => setAlertOpen(!alertOpen);

  const onToggleDialog = () => {
    setDialogOpen(!dialogOpen);
    setText("");
  };

  const onToggleQR = () => setQrOpen(!qrOpen);
  const onToggleDrawer = () => setDrawerOpen(!drawerOpen);

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setText(e.target.value);
  };
  const handleOnSubmit = () => {
    if (!text) {
      setDialogOpen(false);
      return;
    }
    /**
     * Todo 型オブジェクトの型定義が更新されたため、
     * number 型の id プロパティの存在が必須になった
     */
    const newTodo: Todo = {
      value: text,
      id: new Date().getTime(),
      checked: false,
      removed: false,
    };
    setTodos([newTodo, ...todos]);
    setText("");
    setDialogOpen(false);
  };

  const handleOnEdit = (id: number, value: string) => {
    /**
     * ディープコピー：
     * Array.map() を利用するが、それぞれの要素をスプレッド構文で
     * いったんコピーし、それらのコピー (= Todo 型オブジェクト) を要素とする
     * 新しい配列を再生成する。
     * 以下と同義:
     * const deepCopy = todos.map((todo) => ({
     *   value: todo.value,
     *   id: todo.id,
     * }));
     */

    const deepCopy = todos.map((todo) => ({ ...todo }));

    const newTodos = deepCopy.map((todo) => {
      if (todo.id === id) {
        todo.value = value;
      }
      return todo;
    });

    console.log("=== Original todos ===");
    todos.map((todo) => console.log(`id ${todo.id}, value: ${todo.value}`));

    setTodos(newTodos);
  };

  const handleOnCheck = (id: number, checked: boolean) => {
    const deepCopy = todos.map((todo) => ({ ...todo }));

    const newTodo = deepCopy.map((todo) => {
      // 反転させる
      if (todo.id === id) {
        todo.checked = !checked;
      }
      return todo;
    });
    setTodos(newTodo);
  };

  const handleOnRemove = (id: number, removed: boolean) => {
    const deepCopy = todos.map((todo) => ({ ...todo }));
    const newTodo = deepCopy.map((todo) => {
      if (todo.id === id) {
        todo.removed = !removed;
      }
      return todo;
    });
    setTodos(newTodo);
  };

  const handleOnEmpty = () => {
    const newTodos = todos.filter((todo) => !todo.removed);
    setTodos(newTodos);
  };

  const handleOnSort = (filter: Filter) => {
    setFilter(filter);
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles styles={{ body: { margin: 0, padding: 0 } }} />
      <ToolBar filter={filter} onToggleDrawer={onToggleDrawer} />
      <SideBar
        drawerOpen={drawerOpen}
        onSort={handleOnSort}
        onToggleDrawer={onToggleDrawer}
        onToggleQR={onToggleQR}
      />
      <QR open={qrOpen} onClose={onToggleQR} />
      <FormDialog
        text={text}
        dialogOpen={dialogOpen}
        onChange={handleOnChange}
        onSubmit={handleOnSubmit}
        onToggleDialog={onToggleDialog}
      />
      <AlertDialog
        alertOpen={alertOpen}
        onEmpty={handleOnEmpty}
        onToggleAlert={onToggleAlert}
      />
      <TodoItem
        todos={todos}
        filter={filter}
        onEdit={handleOnEdit}
        onCheck={handleOnCheck}
        onRemove={handleOnRemove}
      />
      <ActionButton
        todos={todos}
        filter={filter}
        alertOpen={alertOpen}
        dialogOpen={dialogOpen}
        onToggleAlert={onToggleAlert}
        onToggleDialog={onToggleDialog}
      />
    </ThemeProvider>
  );
};
