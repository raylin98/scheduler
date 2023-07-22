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
}