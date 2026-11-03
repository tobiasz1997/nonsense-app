import FormErrorMessage from "@components/ui/FormErrorMessage";
import cx from "classnames";
import {
  forwardRef,
  ForwardRefRenderFunction,
  InputHTMLAttributes,
} from "react";

type FormCheckboxProps = {
  label?: string;
  error?: string;
  type?: "checkbox" | "radio";
  secondaryringcolor?: "true" | "false";
};

const FormCheckbox: ForwardRefRenderFunction<
  HTMLInputElement,
  FormCheckboxProps & InputHTMLAttributes<HTMLInputElement>
> = (props, ref) => {
  return (
    <div>
      <label
        className={cx(
          "flex w-full text-green-dark dark:text-pistachio",
          props.disabled ? "cursor-not-allowed" : "cursor-pointer",
        )}
      >
        <span
          className={cx(
            " h-6 w-6 shrink-0 items-center justify-center relative flex focus-within:ring-4",
            props.type === "radio" ? "rounded-full" : "rounded",
            props.secondaryringcolor === "true"
              ? "focus-within:ring-pistachio"
              : "focus-within:ring-yellow",
          )}
        >
          <input
            {...props}
            ref={ref}
            type={props.type ?? "checkbox"}
            className={cx(
              "peer appearance-none h-full w-full border-2 checked:border-2 border-green-dark checked:border-green-dark bg-white checked:bg-white checked:text-white focus-visible:outline-none checked:hover:border-green-dark checked:focus:border-green-dark disabled:opacity-70",
              props.type === "radio" ? "rounded-full" : "rounded",
            )}
          />
          <span
            className={cx(
              "absolute left-1 h-4 w-4 bg-green-dark opacity-0 transition duration-200 peer-checked:opacity-100 peer-disabled:bg-gray-400",
              props.type === "radio" ? "rounded-full" : "rounded-xs",
            )}
          />
        </span>

        {props.label && (
          <span className="ml-3 flex items-center text-xs md:text-base md:leading-5">
            {props.label}
            {props.required && (
              <span className="my-0.5 mx-1 h-1 w-1 rounded-full bg-red" />
            )}
          </span>
        )}
      </label>
      {props.error && <FormErrorMessage>{props.error}</FormErrorMessage>}
    </div>
  );
};

export default forwardRef(FormCheckbox);
