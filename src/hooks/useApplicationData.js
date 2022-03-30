import axios from 'axios';
import { useState, useEffect } from 'react';

export default function useApplcationData(){
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day});

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

  function bookInterview(id, interview) {
    //console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.put(`/api/appointments/${id}`, appointment).then(() => {
    setState(prev => ({...prev, appointments}));
    })    
  }

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
    return axios.delete(`/api/appointments/${appointment.id}`).then (() => {
      setState({...state, appointments})
    })

  }

  return { state, useEffect, cancelInterview, bookInterview, setDay };

}