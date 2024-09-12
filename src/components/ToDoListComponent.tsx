import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  TextField,
  IconButton,
  CardMedia,
} from "@mui/material";
import { snackBarMessageError } from "../redux/snackbar/snackBarSlice";
import { loadingTrue, loadingFalse } from "../redux/loading/loadingSlice";
import { useDispatch, useSelector } from "react-redux";
import { Delete, Edit, Close, Send } from "@mui/icons-material";
import { todolistFalse } from "../redux/todolist/todolistSlice";
import Backdrop from "@mui/material/Backdrop";
import { Poppins } from "next/font/google";
import ButtonComponent from "@/components/ButtonComponent";
import { DragDropContext, Draggable, DropResult } from "@hello-pangea/dnd";
import { StrictModeDroppable as Droppable } from "../utils/StrictModeDroppable";
import { useAxiosConfig } from "../utils/axios";
import CircularProgress from "@mui/material/CircularProgress";

// Configuração da fonte Poppins do Google Fonts
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

type Task = {
  _id: string;
  description: string;
  status: "to-do" | "done";
  order: number;
};

type TaskList = Task[];

export default function ToDoListComponent() {
  const [todoList, setTodoList] = useState<TaskList>([]);
  const [doneList, setDoneList] = useState<TaskList>([]);
  const [newTask, setNewTask] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editingTaskDescription, setEditingTaskDescription] =
    useState<string>("");
  const axiosInterceptor = useAxiosConfig();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useDispatch();
  const refreshToDoList = useSelector((state: any) => state.todolist.todolist);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  useEffect(() => {
    fetchTasks();
  }, [refreshToDoList]);

  const fetchTasks = async () => {
    setLoading(true);

    try {
      const response = await axiosInterceptor.get<{
        todo: TaskList;
        done: TaskList;
      }>("/api/tasks/find", {
        withCredentials: true,
      });

      setTodoList(response.data.todo);
      setDoneList(response.data.done);
    } catch (error: any) {
      dispatch(snackBarMessageError(error.response.data.error));
    } finally {
      setLoading(false);
      dispatch(todolistFalse());
    }
  };

  const handleCreateTask = async () => {
    if (!newTask.trim()) return;
    setLoading(true);
    try {
      const response = await axiosInterceptor.post(
        "/api/tasks/create",
        { description: newTask },
        { withCredentials: true }
      );

      if (response.status === 201) {
        const newTaskItem: Task = {
          _id: response.data.task._id,
          description: newTask,
          status: "to-do",
          order: todoList.length,
        };
        setTodoList((prevList) => [...prevList, newTaskItem]);
        setNewTask("");
        setIsEditing(false);
      }
    } catch (error: any) {
      dispatch(snackBarMessageError(error.response.data.error));
    } finally {
      setLoading(false);
    }
  };

  const handleEditTask = async (taskId: string) => {
    setLoading(true);
    const updateTaskDescription = (task: Task) =>
      task._id === taskId
        ? { ...task, description: editingTaskDescription }
        : task;

    setTodoList((prevList) => prevList.map(updateTaskDescription));
    setDoneList((prevList) => prevList.map(updateTaskDescription));

    updateTasksBulk(todoList.concat(doneList).map(updateTaskDescription));
    setEditingTaskId(null);
    setEditingTaskDescription("");
  };

  const updateTasksBulk = async (tasks: TaskList) => {
    setLoading(true);
    try {
      await axiosInterceptor.post(
        "/api/tasks/update-bulk",
        { tasks },
        { withCredentials: true }
      );
    } catch (error: any) {
      dispatch(snackBarMessageError(error.response.data.error));
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    setLoading(true);
    try {
      await axiosInterceptor.delete(`/api/tasks/delete/${taskId}`, {
        withCredentials: true,
      });

      setTodoList((prevList) => prevList.filter((task) => task._id !== taskId));
      setDoneList((prevList) => prevList.filter((task) => task._id !== taskId));
    } catch (error: any) {
      dispatch(snackBarMessageError(error.response.data.error));
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTasksByStatus = async (status: "to-do" | "done") => {
    setLoading(true);
    try {
      await axiosInterceptor.delete(`/api/tasks/delete/status/${status}`, {
        withCredentials: true,
      });

      if (status === "to-do") setTodoList([]);
      else setDoneList([]);
    } catch (error) {
      console.error(
        `Erro ao excluir todas as tarefas com status ${status}`,
        error
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    const reorderList = (
      list: TaskList,
      startIndex: number,
      endIndex: number
    ): TaskList => {
      const updatedList = [...list];
      const [removed] = updatedList.splice(startIndex, 1);
      updatedList.splice(endIndex, 0, removed);

      return updatedList.map((task, index) => ({
        ...task,
        order: index,
      }));
    };

    if (source.droppableId === destination.droppableId) {
      const updatedList =
        source.droppableId === "todoList"
          ? reorderList(todoList, source.index, destination.index)
          : reorderList(doneList, source.index, destination.index);

      if (source.droppableId === "todoList") {
        setTodoList(updatedList);
      } else {
        setDoneList(updatedList);
      }

      updateTasksBulk(updatedList);
    } else {
      const sourceList =
        source.droppableId === "todoList" ? [...todoList] : [...doneList];
      const destList =
        destination.droppableId === "todoList" ? [...todoList] : [...doneList];

      const [movedItem] = sourceList.splice(source.index, 1);
      movedItem.status =
        destination.droppableId === "doneList" ? "done" : "to-do";
      destList.splice(destination.index, 0, movedItem);

      const updatedSourceList = reorderList(sourceList, 0, 0);
      const updatedDestList = reorderList(destList, 0, 0);

      setTodoList(
        destination.droppableId === "todoList"
          ? updatedDestList
          : updatedSourceList
      );
      setDoneList(
        destination.droppableId === "doneList"
          ? updatedDestList
          : updatedSourceList
      );

      updateTasksBulk([...updatedSourceList, ...updatedDestList]);
    }
  };

  const handleBlur = () => {
    if (!newTask.trim()) setIsEditing(false);
    else handleCreateTask();
  };

  const renderTaskList = (
    tasks: TaskList,
    droppableId: string,
    header: string,
    borderColor: string,
    handleDelete: () => void
  ) => (
    <Droppable droppableId={droppableId}>
      {(provided) => (
        <Box
          ref={provided.innerRef}
          {...provided.droppableProps}
          sx={taskContainerStyles(borderColor)}
        >
          {loading && (
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                zIndex: 1,
              }}
            >
              <CircularProgress color="inherit" />
            </Box>
          )}
          <Typography sx={headerStyles}>{header}</Typography>

          {droppableId === "todoList" ? (
            <>
              <Typography sx={descriptionStyles("todoList")}>
                Take a breath. Start doing.
              </Typography>

              <Box sx={taskStyles}>
                <CardMedia
                  component="img"
                  image="/images/New_Task_ToDo_Icon.png"
                  alt="Ícone pequeno e laranja com o centro vazio"
                  sx={toDoListIcons}
                />
                {isEditing ? (
                  <Box
                    className="flex items-center w-full"
                    sx={{ height: "29.25px" }}
                  >
                    <TextField
                      inputRef={inputRef}
                      value={newTask}
                      onChange={(e) => setNewTask(e.target.value)}
                      onBlur={handleBlur}
                      onKeyDown={(e) => e.key === "Enter" && handleCreateTask()}
                      fullWidth
                      variant="standard"
                      sx={textFieldStyles}
                    />
                    <IconButton
                      onClick={() => setIsEditing(false)}
                      className="ml-2"
                    >
                      <Close />
                    </IconButton>
                    <IconButton
                      onClick={handleCreateTask}
                      sx={{
                        ml: 2,
                        display: "none",
                        "@media (max-width:1280px)": {
                          display: "block",
                        },
                      }}
                    >
                      <Send />
                    </IconButton>
                  </Box>
                ) : (
                  <Typography
                    onClick={() => setIsEditing(true)}
                    sx={newTaskTypographyStyles}
                  >
                    this is a new task
                  </Typography>
                )}
              </Box>
            </>
          ) : (
            doneList.length > 0 && (
              <Box>
                <Typography sx={congratulationTextStyles}>
                  Congratulations!
                </Typography>
                <Typography sx={descriptionStyles("doneList")}>
                  You have done {doneList.length} task
                  {doneList.length > 1 ? "s" : ""}
                </Typography>
              </Box>
            )
          )}
          {tasks.map((item, index) => (
            <Draggable key={item._id} draggableId={item._id} index={index}>
              {(provided) => (
                <Box
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  sx={draggableItemStyles}
                >
                  {droppableId === "todoList" ? (
                    <CardMedia
                      component="img"
                      image="/images/New_Task_Icon.png"
                      alt="Ícone pequeno e laranja com o centro vazio"
                      sx={toDoListIcons}
                    />
                  ) : (
                    <CardMedia
                      component="img"
                      image="/images/New_Task_Done_Icon.png"
                      alt="New Task Done Icon"
                      sx={toDoListIcons}
                    />
                  )}
                  {editingTaskId === item._id ? (
                    <TextField
                      variant="standard"
                      sx={textFieldStyles}
                      value={editingTaskDescription}
                      onChange={(e) =>
                        setEditingTaskDescription(e.target.value)
                      }
                      onBlur={() => handleEditTask(item._id)}
                      onKeyDown={(e) =>
                        e.key === "Enter" && handleEditTask(item._id)
                      }
                      fullWidth
                    />
                  ) : (
                    <Typography sx={taskDescriptionStyles}>
                      {item.description}
                    </Typography>
                  )}
                  <IconButton
                    className="edit-button"
                    onClick={() => {
                      setEditingTaskId(item._id);
                      setEditingTaskDescription(item.description);
                    }}
                    sx={editButtonStyles}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    className="delete-button"
                    onClick={() => handleDeleteTask(item._id)}
                    sx={deleteButtonStyles}
                  >
                    <Delete />
                  </IconButton>
                </Box>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
          <ButtonComponent
            color="#ffffff"
            backgroundColor="#000000"
            onClick={handleDelete}
            width="300px"
            height="64px"
            borderRadius="10px"
            margin={droppableId === "todoList" ? "30px 0 0 0" : "52px 0 0 0"}
            sx={eraseButton(droppableId)}
          >
            <Typography sx={eraseButtonTextStyles}>erase all</Typography>
          </ButtonComponent>
        </Box>
      )}
    </Droppable>
  );

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            left: 0,
          }}
        >
          <CardMedia
            component="img"
            image="/images/Background_Half_Arrow.png"
            alt="Imagem de fundo da metade de um triangulo"
            sx={{
              "@media (max-width:1280px)": {
                display: "none",
              },
            }}
          />
        </Box>
        <Box sx={mainContainerStyles}>
          {renderTaskList(todoList, "todoList", "To-do", "#E88D39", () =>
            handleDeleteTasksByStatus("to-do")
          )}
          {renderTaskList(doneList, "doneList", "Done", "#4AC959", () =>
            handleDeleteTasksByStatus("done")
          )}
        </Box>
      </Box>
    </DragDropContext>
  );
}

// Estilos reutilizáveis
const taskContainerStyles = (borderColor: string) => ({
  boxShadow: "0px 4px 12px 0px #42424233",
  display: "flex",
  position: "relative",
  backgroundColor: "#ffffff",
  alignItems: "center",
  flexDirection: "column",
  width: "100%",
  maxWidth: "380px",
  borderTop: `solid 20px ${borderColor}`,
  height: "700px",
  maxHeight: "700px",
  overflow: "overlay",
  padding: "0 38px 40px 23px",
  "@media (max-width:1280px)": {
    margin: "20px 0",
  },
});

const headerStyles = {
  textAlign: "center",
  fontSize: "40px",
  paddingTop: "21px",
  fontWeight: "600",
  color: "#000000",
  fontFamily: poppins.style.fontFamily,
};

const descriptionStyles = (listId: string) => ({
  textAlign: "center",
  paddingBottom: `${listId === "todoList" ? "30px" : "44px"}`,
  fontSize: "24px",
  fontWeight: `${listId === "todoList" ? "400" : "700"}`,
  color: "#000000",
  lineHeight: "29.26px",
  maxWidth: `${listId === "todoList" ? "168px" : "280px"}`,
});

const eraseButton = (listId: string) => ({
  width: "300px",
  height: "64px",
  marginTop: `${listId === "todoList" ? "30px" : "52px"}`,
  borderRadius: "10px",
});

const eraseButtonTextStyles = {
  textTransform: "lowercase",
  fontWeight: "600",
  lineHeight: "29.26px",
  fontSize: "24px",
};

const textFieldStyles = {
  "& input": {
    padding: 0,
    height: "29.25px",
  },
  "& fieldset": {
    border: 0,
  },
};

const toDoListIcons = {
  width: "24px",
  height: "24px",
  marginRight: "16px",
  lineHeight: "29.26px",
};

const taskStyles = {
  position: "relative",
  display: "flex",
  justifyContent: "initial",
  alignItems: "center",
  width: "100%",
  cursor: "pointer",
  textAlign: "center",
  lineHeight: "29.26px",
  fontSize: "24px",
  fontWeight: "400",
  color: "#000000",
  "&:hover .edit-button": { display: "block" },
  "&:hover .delete-button": { display: "block" },
};

const newTaskTypographyStyles = {
  cursor: "pointer",
  textAlign: "initial",
  lineHeight: "29.26px",
  fontSize: "16px",
  fontWeight: "700",
  color: "#000000",
};

const congratulationTextStyles = {
  textAlign: "center",
  fontSize: "24px",
  fontWeight: "400",
  color: "#000000",
  lineHeight: "29.26px",
};

const draggableItemStyles = {
  position: "relative",
  display: "flex",
  paddingTop: "20px",
  justifyContent: "initial",
  alignItems: "center",
  width: "100%",
  cursor: "pointer",
  textAlign: "center",
  lineHeight: "29.26px",
  fontSize: "16px",
  fontWeight: "400",
  color: "#000000",
  "& > div": {
    maxWidth: "60%",
  },
  "&:hover .edit-button": { display: "block" },
  "&:hover .delete-button": { display: "block" },
};

const taskDescriptionStyles = {
  fontSize: "16px",
  fontWeight: "400px",
  lineHeight: "24px",
  maxWidth: "65%",
  textAlign: "left",
  wordBreak: "break-word",
};

const editButtonStyles = {
  display: "none",
  position: "absolute",
  right: "30px",
  top: "50%",
  transform: "translateY(-50%)",
  color: "#4caf50",
};

const deleteButtonStyles = {
  display: "none",
  position: "absolute",
  right: "-10px",
  top: "50%",
  transform: "translateY(-50%)",
  color: "#f44336",
};

const mainContainerStyles = {
  width: "100%",
  maxWidth: "801px",
  columnGap: "41px",
  alignItems: "center",
  display: "flex",
  justifyContent: "space-between",
  "@media (max-width:1280px)": {
    flexDirection: "column",
  },
};
