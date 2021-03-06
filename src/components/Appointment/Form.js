import React, { useState } from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";
// import classNames from "classnames";

export default function Form(props) {
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");
  const handleChange = (event) => {
    const { value } = event.target;
    setName(value);
  };
  const reset = () => {
    setName("");
    setInterviewer(null);
    props.onCancel();
  };

  const save = () => {
    if (name === "") {
      setError("student name cannot be blank");
    } else if (interviewer === null) {
      setError("Please select a interviewer");
    } else {
      props.onSave(name, interviewer);
    }
  };

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form onSubmit={(event) => event.preventDefault()} autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            value={name}
            placeholder="Enter Student Name"
            onChange={handleChange}
            data-testid="student-name-input"
            /*
            This must be a controlled component
          */
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList
          interviewers={props.interviewers}
          interviewer={interviewer}
          setInterviewer={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={reset}>
            Cancel
          </Button>
          <Button confirm onClick={save}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}
