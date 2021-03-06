import React from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props
      .bookInterview(props.id, interview)
      .then(() => {
        transition(SHOW);
      })
      .catch((error) => {
        transition(ERROR_SAVE, true);
      })
    
  }

  function delInterview(id, interview){
    transition(DELETING, true);
    props
      .cancelInterview(props.id, interview)
      .then(() => {
        transition(EMPTY);
      })
      .catch((error) => {
        transition(ERROR_DELETE, true);
      })
  }

  return (
    <article className="appointment">
      <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (

        <Show 
          student={props.interview && props.interview.student}
          interviewer={props.interview && props.interview.interviewer && props.interview.interviewer.name}
          onEdit={() => {
            transition(EDIT);
          }}
          onDelete={() => {
            transition(CONFIRM);
          }}
        />
      )}

      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onSave={save}
          onCancel={() => {
            back();
           }}
        />
      )}
      {mode === SAVING && <Status message="Saving..." />}
      {mode === CONFIRM && (
        <Confirm
          onConfirm={delInterview}
          onCancel={() => {
            transition(SHOW);
          }}
        />
      )}
      {mode === EDIT && (
        <Form 
        student={props.interview && props.interview.student}
        interviewers={props.interviewers}
        interviewer={props.interview && props.interview.interviewer && props.interview.interviewer.id}
        onSave={save}
        onCancel={() =>{
          transition(SHOW);
        }}
        />
      )}
      {mode === DELETING && <Status message="Deleting..." />}
      {mode === ERROR_SAVE && (
        <Error 
        message="An error has occured, your changes have not been saved." 
        onClose={() => {
          transition(props.id ? EDIT : CREATE)
        }}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error 
        message="An error has occured, your appointment has not been deleted."
        onClose={() => {
          transition(SHOW);
        }}
        />
      )}
    </article>
  );
}