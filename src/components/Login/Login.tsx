import React, { FC } from "react";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import { required } from "../../utils/validators/validators";
import { Input } from "../common/FormsControls/FormsControls";
import { connect } from "react-redux";
import { login } from "../../redux/auth-reducer";
import { Redirect } from "react-router-dom";
import style from "../common/FormsControls/FormControls.module.css";
import { AppStateType } from "../../redux/redux-store";

const LoginForm: FC<InjectedFormProps<LoginFormValuesType>> = ({
  handleSubmit,
  error,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Field
          placeholder={"Email"}
          validate={[required]}
          name="email"
          component={Input}
        />
      </div>
      <div>
        <Field
          placeholder={"Password"}
          type="password"
          validate={[required]}
          name="password"
          component={Input}
        />
      </div>
      <div>
        <Field
          type={"checkbox"}
          validate={[required]}
          name="rememberMe"
          component={Input}
        />{" "}
        remember me
      </div>
      {error && <div className={style.formSummaryError}>{error}</div>}
      <div>
        <button type="submit">Login</button>
      </div>
    </form>
  );
};

const LoginReduxForm = reduxForm<LoginFormValuesType>({
  form: "login",
})(LoginForm);

type MapStatePropsType = {
  isAuth: boolean;
};

type MapDispatchPropsType = {
  login: (email: string, password: string, rememberMe: boolean) => void;
};

type LoginFormValuesType = {
  email: string;
  password: string;
  rememberMe: boolean;
};

const Login: FC<MapStatePropsType & MapDispatchPropsType> = (props) => {
  const onSubmit = (formData: LoginFormValuesType) => {
    console.log(formData);
    props.login(formData.email, formData.password, formData.rememberMe);
  };

  if (props.isAuth) {
    return <Redirect to="/profile" />;
  }
  return (
    <div>
      <h1>Login</h1>
      <LoginReduxForm onSubmit={onSubmit} />
    </div>
  );
};

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    isAuth: state.auth.isAuth,
  };
};

export default connect(mapStateToProps, { login })(Login);
