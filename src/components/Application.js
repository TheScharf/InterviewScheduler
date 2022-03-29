import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";
import useVisualMode from "hooks/useVisualMode";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })

  const dailyAppointments = getAppointmentsForDay(state, state.day);

  const dailyInterviewers = getInterviewersForDay(state, state.day);

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
    console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    setState({...state, appointments});
  }

  const scheduleArr = dailyAppointments.map(appMap => {
    const interview = getInterview(state, appMap.interview);
    return (
      <Appointment
        key={appMap.id}
        id={appMap.id}
        time={appMap.time}
        interviewers={dailyInterviewers}
        interview={interview}
        bookInterview={bookInterview}
      />
    )
  })

  

  // function handleDay() {
  //   return setDay(props.day)
  // }

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
            value={state.day}
            onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {scheduleArr}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
