import OptionTitle from "@components/features/Generators/Filters/OptionTitle";
import FormCheckbox from "@components/ui/FormCheckbox";
import FormInput from "@components/ui/FormInput";
import {
  initialArraySlicerState,
  setArrayCount,
  setArrayMaxValue,
  setArrayMinValue,
  setArrayOrderType,
  setArrayResultType,
  setArraySorted,
} from "@store/slices/generators/array.slice";
import { useAppDispatch, useAppSelector } from "@store/store";
import { orderType, resultType } from "@utils/generators/arrayGenerator";
import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

const ArrayOptions: FC = () => {
  const count = useAppSelector((state) => state.arraySlice.count);
  const min = useAppSelector((state) => state.arraySlice.min);
  const max = useAppSelector((state) => state.arraySlice.max);
  const orderType = useAppSelector((state) => state.arraySlice.orderType);
  const sorted = useAppSelector((state) => state.arraySlice.sorted);
  const resultType = useAppSelector((state) => state.arraySlice.resultType);
  const dispatch = useAppDispatch();

  const t = useTranslations("validation");
  const tGenerator = useTranslations("generators");
  const tCommon = useTranslations("common");

  const [countError, setCountError] = useState<string>("");
  const [minError, setMinError] = useState<string>("");
  const [maxError, setMaxError] = useState<string>("");
  const [maxDisabled, setMaxDisabled] = useState<boolean>(false);
  const maxRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (orderType === "sequential") {
      setMaxDisabled(true);
    } else {
      setMaxDisabled(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCountValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value === "" || value === undefined) {
      setCountError(t("valueRequired"));
      return;
    }
    const numberValue = Number(value);
    if (isNaN(numberValue)) {
      setCountError(t("mustBeNumber"));
      return;
    } else if (numberValue <= 0) {
      setCountError(t("mustBeNonNegative"));
      return;
    } else {
      setCountError("");
      dispatch(setArrayCount(numberValue));
    }
  };

  const handleMinValueChange = (
    event: ChangeEvent<HTMLInputElement>,
    checkMaxRule = true,
  ) => {
    const value = event.target.value;
    if (value === "" || value === undefined) {
      setMinError(t("valueRequired"));
      return;
    }
    const numberValue = Number(value);
    if (isNaN(numberValue)) {
      setMinError(t("mustBeNumber"));
      return;
    } else if (checkMaxRule && !maxDisabled && numberValue > max) {
      setMinError(t("minMustBeLessThanMax"));
      return;
    } else {
      setMinError("");
      dispatch(setArrayMinValue(numberValue));
    }
  };

  const handleMaxValueChange = (
    event: ChangeEvent<HTMLInputElement>,
    checkMinRule = true,
  ) => {
    const value = event.target.value;
    if (value === "" || value === undefined) {
      setMaxError(t("valueRequired"));
      return;
    }

    const numberValue = Number(value);
    if (isNaN(numberValue)) {
      setMaxError(t("mustBeNumber"));
      return;
    } else if (checkMinRule && numberValue < min) {
      setMaxError(t("maxMustBeGreaterThanMin"));
      return;
    } else {
      setMaxError("");
      dispatch(setArrayMaxValue(numberValue));
    }
  };

  const handleOrderTypeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value as orderType;
    if (value === "random") {
      setMaxDisabled(false);
      handleMinValueChange({
        target: { value: min },
      } as unknown as ChangeEvent<HTMLInputElement>);
      handleMaxValueChange({
        target: { value: max },
      } as unknown as ChangeEvent<HTMLInputElement>);
    } else {
      setMaxDisabled(true);
      maxRef.current!.value = String(initialArraySlicerState.max);
      handleMaxValueChange(
        {
          target: { value: initialArraySlicerState.max },
        } as unknown as ChangeEvent<HTMLInputElement>,
        false,
      );
      handleMinValueChange(
        { target: { value: min } } as unknown as ChangeEvent<HTMLInputElement>,
        false,
      );
    }
    dispatch(setArrayOrderType(value));
  };

  const handleResultTypeChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setArrayResultType(event.target.value as resultType));
  };

  const handleSortedChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setArraySorted(event.target.value === "true"));
  };

  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
      <div className="flex flex-col space-y-4">
        <OptionTitle title={tGenerator("length")} />
        <FormInput
          type="number"
          defaultValue={count}
          error={countError}
          onChange={handleCountValueChange}
        />
      </div>
      <div className="flex flex-col space-y-4">
        <OptionTitle title={tGenerator("range")} />
        <FormInput
          type="number"
          label={"Minimum"}
          defaultValue={min}
          error={minError}
          onChange={handleMinValueChange}
        />
        <FormInput
          ref={maxRef}
          type="number"
          label={tGenerator("maximum")}
          defaultValue={max ?? undefined}
          disabled={maxDisabled}
          error={maxError}
          onChange={handleMaxValueChange}
        />
      </div>
      <div className="flex flex-col space-y-4">
        <OptionTitle title={tGenerator("order")} />
        <FormCheckbox
          checked={orderType === "random"}
          value="random"
          label={tGenerator("random")}
          type="radio"
          onChange={handleOrderTypeChange}
        />
        <FormCheckbox
          checked={orderType === "sequential"}
          value="sequential"
          label={tGenerator("sequential")}
          type="radio"
          onChange={handleOrderTypeChange}
        />
      </div>
      <div className="flex flex-col space-y-4">
        <OptionTitle title={tGenerator("sort")} />
        <FormCheckbox
          checked={sorted === true}
          value="true"
          label={tCommon("yes")}
          type="radio"
          onChange={handleSortedChange}
        />
        <FormCheckbox
          checked={sorted === false}
          value="false"
          label={tCommon("no")}
          type="radio"
          onChange={handleSortedChange}
        />
      </div>
      <div className="flex flex-col space-y-4">
        <OptionTitle title={tGenerator("resultType")} />
        <FormCheckbox
          checked={resultType === "array"}
          value="array"
          label={tGenerator("array")}
          type="radio"
          onChange={handleResultTypeChange}
        />
        <FormCheckbox
          checked={resultType === "semicolon"}
          value="semicolon"
          label={tGenerator("semicolon")}
          type="radio"
          onChange={handleResultTypeChange}
        />
        <FormCheckbox
          checked={resultType === "comma"}
          value="comma"
          label={tGenerator("comma")}
          type="radio"
          onChange={handleResultTypeChange}
        />
      </div>
    </section>
  );
};

export default ArrayOptions;
