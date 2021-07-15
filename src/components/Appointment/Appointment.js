import React, { useEffect } from "react";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import "./styles.scss";
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

  // Bring in mode and use transition() to switch component
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  function onSave(name, interviewer) {
    transition(SAVING);
    const interview = {
      student: name,
      interviewer: interviewer,
    };
    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(() => transition(ERROR_SAVE, true));
  }

  function onDelete() {
    transition(CONFIRM);
  }

  function onEdit() {
    transition(EDIT);
  }

  function onConfirm() {
    transition(DELETING);
    props
      .cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(() => transition(ERROR_DELETE, true));
  }
  
  return (
    <article className='appointment'>
      <Header time={props.time}></Header>

      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show interview={props.interview} onDelete={onDelete} onEdit={onEdit} />
      )}
      {mode === CREATE && (
        <Form
          onCancel={back}
          interviewers={props.interviewers}
          onSave={onSave}
        />
      )}
      {mode === SAVING && <Status message={"Saving"} />}
      {mode === DELETING && <Status message={"Deleting"} />}
      {mode === CONFIRM && <Confirm onConfirm={onConfirm} onCancel={back} />}

      {mode === EDIT && (
        <Form
          onCancel={back}
          interviewers={props.interviewers}
          name={props.interview.student}
          onSave={onSave}
          interviewer={props.interview.interviewer.id}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error
          message={
            "Some error occured while saving your interview please try again later"
          }
          onError={back}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error
          message={
            "Some error occured while deleting your interview please try again later"
          }
          onError={back}
        />
      )}
    </article>
  );
}
