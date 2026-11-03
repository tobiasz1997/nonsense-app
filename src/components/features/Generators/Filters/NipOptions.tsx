import OptionTitle from "@components/features/Generators/Filters/OptionTitle";
import FormCheckbox from "@components/ui/FormCheckbox";
import { setNipDivider } from "@store/slices/generators/nip.slice";
import { useAppDispatch, useAppSelector } from "@store/store";
import { ChangeEvent, FC } from "react";
import { useTranslations } from "next-intl";

const NipOptions: FC = () => {
  const isDivider = useAppSelector((state) => state.nipSlice.divider);
  const dispatch = useAppDispatch();

  const handleDividerChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setNipDivider(event.target.value === "true"));
  };

  const tGenerator = useTranslations("generators");
  const tCommon = useTranslations("common");

  return (
    <div className="flex flex-col space-y-4">
      <OptionTitle title={tGenerator("divider")} />
      <FormCheckbox
        checked={isDivider === true}
        value="true"
        label={tCommon("yes")}
        type="radio"
        onChange={handleDividerChange}
      />
      <FormCheckbox
        checked={isDivider === false}
        value="false"
        label={tCommon("no")}
        type="radio"
        onChange={handleDividerChange}
      />
    </div>
  );
};

export default NipOptions;
