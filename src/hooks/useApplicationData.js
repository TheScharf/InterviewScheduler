import axios from 'axios';
import { useState, useEffect } from 'react';

export default function useApplcationData(){
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  //// Sets state for the day ////
  const setDay = day => setState({ ...state, day});

  //// axios requests ////
  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers')
    ]).then((all) => {
        console.log(all[0]);
        console.log(all[1]);
        console.log(all[2]);
        setState((prev) => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    })
  }, []);

  //// to book a new interview ////
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.put(`/api/appointments/${id}`, appointment).then((res) => {
      const days = updateSpots(state.day, state.days, appointments);
      setState(prev => ({...prev, appointments, days}));
    })    
  }

  //// to cancel an existing interview ////
  function cancelInterview(id, interview) {
    console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.delete(`/api/appointments/${appointment.id}`).then ((res) => {
      const days = updateSpots(state.day, state.days, appointments);
      setState({...state, appointments, days})
    })

  }

  //// updates available spots for appointments whenever a change has occured ////
  function updateSpots(day, days, appointments) {
    const dayObj = days.find((item) => item.name === day);
    const apptID = dayObj.appointments;

    let spots = 0;

    for (const id of apptID) {
      const appt = appointments[id];
      if (!appt.interview) {
        spots++;
      }
    }
    const newDayObj = {...dayObj, spots};
    const newArr = days.map((item) => (item.name === day ? newDayObj : item));
    return newArr;
  }

  return { state, useEffect, cancelInterview, bookInterview, setDay };

}