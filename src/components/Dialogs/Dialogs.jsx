import React from "react";
import { Field, reduxForm } from "redux-form";
import { maxLengthCreator, required } from "../../utils/validators/validators";
import { Textarea } from "../common/FormsControls/FormsControls";
import DialogItem from "./DialogItem/DialogItem";
import classes from "./Dialogs.module.css";
import Message from "./Message/Message";

const Dialogs = ({ dialogsPage, sendMessage}) => {
  let state = dialogsPage;
  let dialogsElement = state.dialogsData.map((dialog) => (
    <DialogItem key={dialog.id} name={dialog.name} id={dialog.id} />
  ));

  let messageses = state.messagesData.map((message) => (
    <Message key={message.id} message={message.message} />
  ));

  const maxLengthVal = maxLengthCreator(10)

  const AddMessagesForm = (props) => {
    return (
      <form onSubmit={props.handleSubmit}>
         <div>
            <Field name="messText" placeholder="Enter your message" component={Textarea} validate={[required, maxLengthVal]}/>
          </div>
          <div>
            <button>Send</button>
          </div>
      </form>
    )
  }
  
  const AddMessageFormRedux = reduxForm({
    form: 'formAddNewMessages'
  })(AddMessagesForm)
  

  let onSendMessageClick = (values) => {
    sendMessage(values.messText);
  };

  return (
    <div className={classes.dialogs}>
      <div className={classes.dialogsItems}>{dialogsElement}</div>
      <div className={classes.messages}>
        <div>{messageses}</div>
        <AddMessageFormRedux onSubmit={onSendMessageClick} />
      </div>
    </div>
  );
};

export default Dialogs;
