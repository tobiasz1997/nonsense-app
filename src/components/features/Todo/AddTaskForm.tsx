import Button from "@components/ui/Button";
import FormInput from "@components/ui/FormInput";
import { TaskFormType } from "@interfaces/taskFormType";
import { validateRequired } from "@utils/validators";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";

type Props = {
  onSubmit: (payload: TaskFormType) => void;
};

const AddTaskForm: FC<Props> = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskFormType>();

  const t = useTranslations("tasks");

  return (
    <form className="mt-5" noValidate onSubmit={handleSubmit(props.onSubmit)}>
      <FormInput
        autoFocus
        {...register("task", { ...validateRequired() })}
        placeholder={t("taskPlaceholder")}
        error={errors.task?.message}
      />
      <div className="mt-5">
        <Button>{t("sendMessage")}</Button>
      </div>
    </form>
  );
};

export default AddTaskForm;
