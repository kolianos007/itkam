import { FC } from "react";
import { WrappedFieldMetaProps, WrappedFieldProps } from "redux-form";
import styles from "./FormControls.module.css";

type FormControlPropsType = {
  meta: WrappedFieldMetaProps;
};

const FormControl: FC<FormControlPropsType> = ({
  meta: { touched, error },
  children,
}) => {
  const hasError = touched && error;
  return (
    <div className={styles.formControl + " " + (hasError ? styles.error : "")}>
      <div>{children}</div>
      {hasError && <span>{error}</span>}
    </div>
  );
};

export const Textarea: FC<WrappedFieldProps> = (props) => {
  const { input, meta, children, ...restProps } = props;
  return (
    <FormControl {...props}>
      <textarea {...input} {...restProps} />
    </FormControl>
  );
};

export const Input: FC<WrappedFieldProps> = (props) => {
  const { input, meta, children, ...restProps } = props;
  return (
    <FormControl {...props}>
      <input {...input} {...restProps} />
    </FormControl>
  );
};
