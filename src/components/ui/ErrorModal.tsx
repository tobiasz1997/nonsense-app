import Button from "@components/ui/Button";
import Modal from "@components/ui/Modal";
import ModalBox from "@components/ui/ModalBox";
import { FC } from "react";
import { useTranslations } from "next-intl";

type Props = {
  onClose: () => void;
  onAction: () => void;
  label?: string;
};

const ErrorModal: FC<Props> = (props) => {
  const t = useTranslations("common");

  return (
    <Modal>
      <ModalBox onClose={props.onClose}>
        <h2 className="text-xl font-bold text-orange md:text-3xl">
          {t("errorTitle")}
        </h2>
        <p className="text-green-dark dark:text-yellow mt-3 mb-5">
          {t("unexpectedError")}
        </p>
        <div className="flex justify-center">
          <Button className="max-w-max" onClick={props.onAction}>
            {props.label ?? t("ok")}
          </Button>
        </div>
      </ModalBox>
    </Modal>
  );
};

export default ErrorModal;
