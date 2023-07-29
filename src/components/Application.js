import React, {useState, useEffect} from "react";
import axios from "axios";

import "components/Application.scss";

import DayList from "./DayList";

import Appointment from "./Appointment";
import { getInterview, getAppointmentsForDay, getInterviewersForDay } from "helpers/selectors";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  })
  const setDay = day => setState({ ...state, day });
  /* const dailyAppointments = getAppointmentsForDay(state, state.day) */

  useEffect(() => {
     Promise.all([
      Promise.resolve(axios.get('http://localhost:8001/api/days')),
      Promise.resolve(axios.get('http://localhost:8001/api/appointments')),
      Promise.resolve(axios.get('http://localhost:8001/api/interviewers'))
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    })
  }, [])

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview:{...interview}
    };

    const appointments = { 
      ...state.appointments,
      [id]: appointment
    }
    return axios
    .put(`http://localhost:8001/api/appointments/${id}`, {interview:interview})
    .then(res => {
      setState({...state, appointments})
      return res.status
    })
  }

  function cancelInterview(id) {
    const appointment = { 
      ...state.appointments[id],
      interview:null
    }
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }
    
    return axios
    .delete(`http://localhost:8001/api/appointments/${id}`, appointment)
    .then(res => {
      setState({...state, appointments})
      return res
    })
  }

  const appointments = getAppointmentsForDay(state, state.day);

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
