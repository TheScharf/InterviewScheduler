import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import { getAppointmentsForDay } from "helpers/selectors";

// const appointments = {
//   "1": {
//     id: 1,
//     time: "12pm",
//   },
//   "2": {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer:{
//         id: 3,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   "3": {
//     id: 3,
//     time: "2pm",
//   },
//   "4": {
//     id: 4,
//     time: "3pm",
//     interview: {
//       student: "Archie Andrews",
//       interviewer:{
//         id: 4,
//         name: "Cohana Roy",
//         avatar: "https://i.imgur.com/FK8V841.jpg",
//       }
//     }
//   },
//   "5": {
//     id: 5,
//     time: "4pm",
//   }
// };

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewer: {}
  })

  let dailyAppointments = [];
  dailyAppointments = getAppointmentsForDay(state, state.day);

  const setDay = day => setState({ ...state, day});
  //const setDays = days => setState(prev => ({ ...prev, days}));

  useEffect(() => {
    //const url = `http://localhost:8001/api`;
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers')
    ]).then((all) => {
        console.log(all[0]);
        console.log(all[1]);
        console.log(all[2]);
        setState((prev) => ({...prev, days: all[0].data, appointments: all[1].data, interviewer: all[2].data}));
    })
  }, []);

  const scheduleArr = dailyAppointments.map(appMap => {
    const interview = getInterview(state, appMap.interview);
    return (
      <Appointment
        key={appMap.id}
        {...appMap}
        // id={appMap.id}
        // time={appMap.time}
        // interview={appMap.interview}
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
