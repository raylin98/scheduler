import React from "react";
import "components/Application.scss";
import Appointment from "./Appointment";
import DayList from "./DayList";
import { getInterview, getAppointmentsForDay, getInterviewersForDay } from "helpers/selectors";
import useApplicationData from "components/hooks/useApplicationData.js"

export default function Application(props) {
  const {state, setDay, bookInterview, cancelInterview} = useApplicationData()
  const appointments = getAppointmentsForDay(state, state.day)
  const interviewers = getInterviewersForDay(state, state.day);
  const schedule = appointments.map((appointments) => {
    const interview = getInterview(state, appointments.interview);
    return (
      <Appointment
        key={appointments.id}
        id={appointments.id}
        time={appointments.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
      {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
