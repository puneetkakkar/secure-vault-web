import { InputProps, useInput } from "@nextui-org/react";
import React, { Ref, forwardRef } from "react";
import { CloseFilledIcon } from "./icons";

interface TextInputProps extends InputProps {
  customStyles?: {
    label?: string;
    base?: string;
    input?: string | string[];
    innerWrapper?: string;
    inputWrapper?: string | string[];
    errorMessage?: string;
  };
}

const styles = {
  label: "text-black/50 dark:text-white/90",
  base: "my-6",
  input: [
    "bg-transparent",
    "mt-4",
    "text-black/90 dark:text-white/90",
    "placeholder:text-default-700/50 dark:placeholder:text-white/60",
  ],
  innerWrapper: "bg-transparent",
  inputWrapper: [
    "bg-default-200/50",
    "dark:bg-default/60",
    "backdrop-blur-xl",
    "backdrop-saturate-200",
    "hover:bg-default-200/70",
    "focus-within:!bg-default-200/50",
    "dark:hover:bg-default/70",
    "dark:focus-within:!bg-default/60",
    "!cursor-text",
  ],
  errorMessage: "pt-1 pl-1 pb-0",
};

const TextInput = forwardRef(
  (props: TextInputProps, ref: Ref<HTMLInputElement>) => {
    const {
      Component,
      label,
      domRef,
      description,
      isClearable,
      startContent,
      endContent,
      shouldLabelBeOutside,
      shouldLabelBeInside,
      errorMessage,
      getBaseProps,
      getLabelProps,
      getInputProps,
      getInnerWrapperProps,
      getInputWrapperProps,
      getDescriptionProps,
      getErrorMessageProps,
      getClearButtonProps,
    } = useInput({
      ...props,
      ref,
      label: props?.label,
      type: props?.type,
      placeholder: props?.placeholder,
      startContent: props?.startContent,
      classNames: {
        ...styles,
        ...(props?.customStyles || {}),
      },
    });

    const labelContent = <label {...getLabelProps()}>{label}</label>;

    const end = React.useMemo(() => {
      if (isClearable) {
        return (
          <span {...getClearButtonProps()}>
            {endContent || <CloseFilledIcon />}
          </span>
        );
      }

      return endContent;
    }, [isClearable, getClearButtonProps]);

    const innerWrapper = React.useMemo(() => {
      if (startContent || end) {
        return (
          <div {...getInnerWrapperProps()}>
            {startContent}
            <input {...getInputProps()} />
            {end}
          </div>
        );
      }

      return <input {...getInputProps()} />;
    }, [startContent, end, getInputProps, getInnerWrapperProps]);

    return (
      <Component {...getBaseProps()}>
        {shouldLabelBeOutside ? labelContent : null}
        <div
          {...getInputWrapperProps()}
          role="button"
          onClick={() => {
            domRef.current?.focus();
          }}
        >
          {shouldLabelBeInside ? labelContent : null}
          {innerWrapper}
        </div>
        {description && <div {...getDescriptionProps()}>{description}</div>}
        {errorMessage && <div {...getErrorMessageProps()}>{errorMessage}</div>}
      </Component>
    );
  }
);

TextInput.displayName = "TextInput";

export default TextInput;
