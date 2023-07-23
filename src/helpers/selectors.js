export function getAppointmentsForDay(state, day) {
  const appointmentDate = state.days.find(date => 
    day === date.name);

    if (state.days.length === 0 || appointmentDate === undefined)
    return [];

    return appointmentDate.appointments.map(id => state.appointments[id]);
};

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }

  return {
    ...interview,
    interviewer: state.interviewers[interview.interviewer]
  };
};

export function getInterviewersForDay(state, day) {
  const interviewerDate = state.days.find(date => 
    day === date.name);

    if (state.days.length === 0 || interviewerDate === undefined)
    return [];

    return interviewerDate.interviewers.map(id => state.interviewers[id]);
};
