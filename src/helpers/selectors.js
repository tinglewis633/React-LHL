export function getAppointmentsForDay(state, dayS) {
  for (const day of state.days) {
    if (day.name === dayS) {
      return day.appointments.map((id) => state.appointments[id]);
    }
  }
  return [];
}

export function getInterview(state, interview) {
  if (interview !== null && typeof interview.interviewer === "number") {
    interview.interviewer = state.interviewers[interview.interviewer];
    return interview;
  }

  return interview;
}

export function getInterviewersForDay(state, dayS) {
  for (const day of state.days) {
    if (day.name === dayS) {
      return day.interviewers.map((id) => state.interviewers[id]);
    }
  }
  return [];
}
