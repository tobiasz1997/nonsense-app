import Confetti from "@components/features/PickerWheel/Confetti";
import GetSetTokenModal from "@components/features/PickerWheel/GetSetTokenModal";
import ManageOptionFormModal from "@components/features/PickerWheel/ManageOptionFormModal";
import ManageOptionsFormModal from "@components/features/PickerWheel/ManageOptionsFormModal";
import Wheel from "@components/features/PickerWheel/Wheel";
import WheelManagePanel from "@components/features/PickerWheel/WheelManagePanel";
import WinnerModal from "@components/features/PickerWheel/WinnerModal";
import { useLocalStorageHydration } from "@hooks/useLocalStorageHydration";
import { AppPage } from "@interfaces/appPage";
import { WheelOption } from "@interfaces/wheelOption";
import { addOptionsInit, setWinner } from "@store/slices/pickerWheel.slice";
import { useAppDispatch, useAppSelector } from "@store/store";
import React, { useMemo } from "react";
import { PICKER_WHEEL_KEY } from "../const/storageKeys.const";
import { useTranslations } from "next-intl";

const PickerWheelPage: AppPage = () => {
  const winner = useAppSelector((state) => state.pickerWheelSlice.winner);
  const options = useAppSelector((state) => state.pickerWheelSlice.options);
  const winnerModal = useAppSelector(
    (state) => state.pickerWheelSlice.winnerModal,
  );
  const optionsFormModal = useAppSelector(
    (state) => state.pickerWheelSlice.optionsFormModal,
  );
  const optionFormModal = useAppSelector(
    (state) => state.pickerWheelSlice.optionFormModal,
  );
  const getSetOptionsModal = useAppSelector(
    (state) => state.pickerWheelSlice.getSetOptionsModal,
  );
  const editedOption = useAppSelector(
    (state) => state.pickerWheelSlice.editedOption,
  );
  const t = useTranslations("nav");

  const activeOptions = useMemo(
    () => options.filter((option) => option.active),
    [options],
  );

  const dispatch = useAppDispatch();
  useLocalStorageHydration<WheelOption[]>(PICKER_WHEEL_KEY, addOptionsInit);

  return (
    <div className="na-p-page space-y-5">
      <h1 className="na-title">{t("pickerWheel")}</h1>

      <section className="flex flex-col md:flex-row gap-4 md:items-start">
        <div className="flex-1 flex justify-center items-center">
          <Wheel
            options={activeOptions}
            winner={winner}
            setWinner={(winner) => dispatch(setWinner(winner))}
          />
        </div>
        <div className="md:w-1/3 flex flex-col">
          {options.length > 0 && <WheelManagePanel winner={winner} />}
        </div>
      </section>

      {winnerModal && winner && (
        <>
          <WinnerModal winner={winner} />
          <Confetti active={true} />
        </>
      )}
      {optionsFormModal && <ManageOptionsFormModal options={options} />}
      {optionFormModal && <ManageOptionFormModal option={editedOption} />}
      {getSetOptionsModal && <GetSetTokenModal />}
    </div>
  );
};

PickerWheelPage.layoutType = "full";
export default PickerWheelPage;
