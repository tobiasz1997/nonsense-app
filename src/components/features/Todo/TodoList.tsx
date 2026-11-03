import AddTaskForm from "@components/features/Todo/AddTaskForm";
import TaskItem from "@components/features/Todo/TaskItem";
import Button from "@components/ui/Button";
import FormSelect from "@components/ui/FormSelect";
import Modal from "@components/ui/Modal";
import ModalBox from "@components/ui/ModalBox";
import { PlusIcon } from "@heroicons/react/24/solid";
import useArrayHelpers from "@hooks/useArrayHelpers";
import { useKeyPress } from "@hooks/useKeyPress";
import { useReturnFocus } from "@hooks/useReturnFocus";
import { SelectOption } from "@interfaces/selectOption";
import { TaskFormType } from "@interfaces/taskFormType";
import { TaskType } from "@interfaces/taskType";
import { todoListSortByOptions } from "@interfaces/todoListSortByOptions";
import {
  addTask,
  deleteTask,
  reorderTasks,
  setTaskStatus,
  sortTasks,
} from "@store/slices/tasks.slice";
import { useAppDispatch, useAppSelector } from "@store/store";
import { Reorder } from "framer-motion";
import { FC, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useTranslations } from "next-intl";

const TodoList: FC = () => {
  const [isAddTaskModalVisible, setIsAddTaskModalVisible] = useState(false);
  const { moveItem } = useArrayHelpers<TaskType>();
  const tasks = useAppSelector((state) => state.tasksSlice.items);
  const dispatch = useAppDispatch();
  const t = useTranslations("tasks");

  useReturnFocus(isAddTaskModalVisible);

  useKeyPress(["ArrowDown", "ArrowUp"], (event) => {
    const element = event.target as HTMLElement;

    const taskId =
      element.closest<HTMLElement>("[data-task-id]")?.dataset.taskId;

    if (!taskId) return;

    dispatch(
      reorderTasks(
        moveItem(
          tasks,
          (task) => task.id === taskId,
          event.key === "ArrowUp" ? "up" : "down",
        ),
      ),
    );
  });

  const handleAddTask = (payload: TaskFormType) => {
    dispatch(
      addTask({ id: uuidv4(), task: payload.task, createdAt: new Date() }),
    );
    setIsAddTaskModalVisible(false);
  };

  const sortByOptionsList: SelectOption[] = [
    {
      label: t("sort.completed"),
      value: "completed" as todoListSortByOptions,
    },
    {
      label: t("sort.notCompleted"),
      value: "notCompleted" as todoListSortByOptions,
    },
    {
      label: t("sort.createdDate"),
      value: "createdDate" as todoListSortByOptions,
    },
  ];

  return (
    <>
      <section className="space-y-5 rounded-xl bg-pistachio p-5 shadow-xl dark:bg-zinc-500">
        <h2 className="text-xl font-bold text-orange sm:text-3xl">TODO</h2>
        <div className="flex items-center justify-between">
          <FormSelect
            options={sortByOptionsList}
            onChange={(e) =>
              dispatch(sortTasks(e.target.value as todoListSortByOptions))
            }
          />
          <Button
            className="max-w-max"
            variant="quaternary"
            icon={<PlusIcon />}
            onClick={() => setIsAddTaskModalVisible(true)}
          />
        </div>
        <Reorder.Group
          className="space-y-5"
          axis="y"
          values={tasks}
          onReorder={(value) => dispatch(reorderTasks(value))}
        >
          {tasks.map((item) => (
            <TaskItem
              key={item.id}
              item={item}
              onStatusChange={(id) => dispatch(setTaskStatus(id))}
              onDelete={(id) => dispatch(deleteTask(id))}
            />
          ))}
        </Reorder.Group>
      </section>

      {isAddTaskModalVisible && (
        <Modal>
          <ModalBox onClose={() => setIsAddTaskModalVisible(false)}>
            <h2 className="na-modal-title">{t("addTask")}</h2>
            <AddTaskForm onSubmit={handleAddTask} />
          </ModalBox>
        </Modal>
      )}
    </>
  );
};

export default TodoList;
