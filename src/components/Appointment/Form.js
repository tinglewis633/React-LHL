import React from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";
import { useState } from "react";
// import classNames from "classnames";

export default function Form(props) {
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  const handleChange = (event) => {
    const { value } = event.target;

    setName(value);
  };
  const reset = (event) => {
    setName("");
    setInterviewer("null");
  };
  return (
    <main className='appointment__card appointment__card--create'>
      <section className='appointment__card-left'>
        <form onSubmit={(event) => event.preventDefault()} autoComplete='off'>
          <input
            className='appointment__create-input text--semi-bold'
            name='name'
            type='text'
            placeholder='Enter Student Name'
            onChange={handleChange}
            /*
            This must be a controlled component
          */
          />
        </form>
        <InterviewerList
          interviewers={props.interviewers}
          // value={interviewer}
          onChange={props.setInterviewer}
        />
      </section>
      <section className='appointment__card-right'>
        <section className='appointment__actions'>
          <Button danger onClick={reset}>
            Cancel
          </Button>
          <Button confirm>Save</Button>
        </section>
      </section>
    </main>
  );
}
