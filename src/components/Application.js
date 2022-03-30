import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";
import useApplicationData from "hooks/useApplicationData";

export default function Application(props) {
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();
  
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  
  const dailyInterviewers = getInterviewersForDay(state, state.day);

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
        cancelInterview={cancelInterview}
      />
    )
  })

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
