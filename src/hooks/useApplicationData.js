import axios from "axios";
import { useState, useEffect } from "react";
const updateSpots = (days, id, appointments) => {
  const whichDayAppointment = days.find((day) => day.appointments.includes(id));

  let spots = 0;
  for (const appointment in appointments) {
    if (
      !appointments[appointment].interview &&
      whichDayAppointment.appointments.includes(appointments[appointment].id)
    ) {
      spots++;
    }
  }
  const index = days.findIndex((day) => day.id === whichDayAppointment.id);
  const newAppointment = { ...whichDayAppointment, spots: spots };


  const newDays = [...days];
  newDays[index] = newAppointment;

  return newDays;
};

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });
  const setDay = (day) => setState({ ...state, day });

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      const days = updateSpots(state.days, id, appointments);
      setState({
        ...state,
        appointments,
        days,
      });
    });
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios.delete(`/api/appointments/${id}`).then(() => {
      const days = updateSpots(state.days, id, appointments);

      setState({
        ...state,
        appointments,
        days,
      });
    });
  }
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/interviewers"),
      axios.get("/api/appointments"),
    ]).then((all) => {
      const [days, interviewers, appointments] = all;
      setState((prev) => ({
        ...prev,
        days: days.data,
        appointments: appointments.data,
        interviewers: interviewers.data,
      }));
    });
  }, []);

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
}
