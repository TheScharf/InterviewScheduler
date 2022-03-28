export function getAppointmentsForDay(state, day) {
  const newArr = [];
  state.days.forEach((oneDay) => {
    if (oneDay.name === day){
      oneDay.appointments.forEach((event) => {
        newArr.push(state.appointments[event]);
      });
    }
  });
  return newArr;
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  let detailObj = {};
  detailObj.student = interview.student;
  detailObj.interviewer = state.interviewers[interview.interviewer];

  return detailObj;
}