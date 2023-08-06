import {useEffect, useState} from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  })
  const setDay = day => setState({ ...state, day });
  /* const dailyAppointments = getAppointmentsForDay(state, state.day) */

  useEffect(() => {
     Promise.all([
      Promise.resolve(axios.get('/api/days')),
      Promise.resolve(axios.get('/api/appointments')),
      Promise.resolve(axios.get('/api/interviewers'))
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    })
  }, [])

  function findDay(day) {
    const daysOfWeek = {
      Monday: 0,
      Tuesday: 1,
      Wednesday: 2,
      Thursday: 3,
      Friday: 4
    }
    return daysOfWeek[day]
  }
  
  function bookInterview(id, interview) {

    const dayOfWeek = findDay(state.day)

    let day = {
      ...state.days[dayOfWeek],
      spots: !state.appointments[id].interview ? state.days[dayOfWeek].spots - 1 : state.days[dayOfWeek].spots
    };

    let days = state.days
    days[dayOfWeek] = day;

    const appointment = {
      ...state.appointments[id],
      interview:{...interview}
    };

    const appointments = { 
      ...state.appointments,
      [id]: appointment
    }
    return axios
    .put(`/api/appointments/${id}`, {interview:interview})
    .then(res => {
      setState({...state, appointments, days})
      return res.status
    })
  }

  function cancelInterview(id) {

    const dayOfWeek = findDay(state.day)

    const day = {
      ...state.days[dayOfWeek],
      spots: state.days[dayOfWeek].spots + 1
    }

    let days = state.days
    days[dayOfWeek] = day;

    const appointment = { 
      ...state.appointments[id],
      interview:null
    }
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }
    
    return axios
    .delete(`/api/appointments/${id}`, appointment)
    .then(res => {
      setState({...state, appointments, days})
      return res
    })
  }
  return {state, setDay, bookInterview, cancelInterview};
}