import React from "react";

import "components/Appointment/styles.scss"

import Header from "components/Appointment/Header."

import Empty from "./Empty";
import Show from "./Show";
import Form from "./Form";
import Status from "./Status"
import Confirm from "./Confirm";
import Error from "./Error";
import useVisualMode from "../hooks/useVisualMode";

export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const CONFIRMING="CONFIRMING"
  const DELETE = "DELETE";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE"
  
  const { mode, transition, back } = useVisualMode (
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);
    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(() => transition(ERROR_SAVE, true))
  }

  const onDelete = () => {
    transition(DELETE, true);
    props
      .cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(() => transition(ERROR_DELETE, true))
  }
  
   return (

    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />
      
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      
      {mode === SHOW && (
       <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        onDelete={()=> transition(CONFIRMING)}
        onEdit={()=> transition(EDIT)}
       />
      )} 
      
      {mode === CREATE &&
      <Form 
      interviewers={props.interviewers}
      onSave={save} 
      onCancel={back}/>}
      
      {mode === SAVING && <Status message="Saving" />}
      
      {mode === CONFIRMING && (
        <Confirm message="Are you sure you want to delete" 
        onConfirm={onDelete}
        onCancel={back}/>
      )}
      
      {mode === DELETE && <Status message="Deleting"/>}
      
      {mode === EDIT && (<Form 
      student={props.interview.student}
      interviewers={props.interviewers}
      onSave={save}
      onCancel={back}
      />)}
      
      {mode === ERROR_SAVE && (<Error 
      message="Error saving appointment" onClose={back} />)}
      
      {mode === ERROR_DELETE && (<Error 
      message="Error deleting appointment" onClose={back} />)}
    </article>
  )
}