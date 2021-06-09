import React from "react";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import "./styles.scss"

export default function Appointment(props) {
  return (
    <article className='appointment'>
      <Header time={props.time}>
     
      </Header>
      {props.interview ? <Show interview={props.interview}></Show> : <Empty></Empty>}
    </article>
  );
}
