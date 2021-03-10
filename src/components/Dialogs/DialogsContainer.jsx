import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withAuthRedirect } from "../../hoc/WithAuthRedirect";
import {
  sendMessageCreator,
} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";

const mapStateToProps = (state) => {
  return {
    dialogsPage: state.dialogsPage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sendMessage: (messText) => {
      dispatch(sendMessageCreator(messText));
    },
  };
};

export default compose(connect(mapStateToProps, mapDispatchToProps), withAuthRedirect)(Dialogs)

