import "components/Application.scss";
import DayList from "components/DayList";
import React, { useState } from "react";
import Appointment from "./Appointment/Appointment";
const appointments = [
  {
    id: 0,
    time: "12pm",
  },
  {
    id: 1,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      },
    },
  },
  {
    id: 2,
    time: "2pm",
  },
  {
    id: 3,
    time: "3pm",
  },
  {
    id: 4,
    time: "4pm",
    interview: {
      student: "Lydia Miller-Jones123",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      },
    },
  },
  {
    id: 5,
    time: "5pm",
  },
  {
    id: 6,
    time: "6pm",
    interview: {
      student: "Lydia Miller-Jones321",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      },
    },
  },
  {
    id: 7,
    time: "7pm",
  },
];
const appointmentList = appointments.map((appointment) => {
  return <Appointment key={appointment.id} {...appointment} />;
});
export default function Application(props) {
  const [day, setDay] = useState("Monday");
  const days = [
    {
      id: 1,
      name: "Monday",
      spots: 2,
    },
    {
      id: 2,
      name: "Tuesday",
      spots: 5,
    },
    {
      id: 3,
      name: "Wednesday",
      spots: 0,
    },
  ];
  return (
    <main className='layout'>
      <section className='sidebar'>
        <img
          className='sidebar--centered'
          src='images/logo.png'
          alt='Interview Scheduler'
        />
        <hr className='sidebar__separator sidebar--centered' />
        <nav className='sidebar__menu'>
          <DayList days={days} day={day} setDay={setDay} />
        </nav>
        <img
          className='sidebar__lhl sidebar--centered'
          src='images/lhl.png'
          alt='Lighthouse Labs'
        />
      </section>
      <section className='schedule'>{appointmentList}</section>
    </main>
  );
}
