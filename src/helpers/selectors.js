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
  if (interview === null) {
    return null;
  }
  let detailObj = {};
  detailObj.student = interview.student;
  const selectedInterviewer = interview.interviewer;
  detailObj.interviewer = state.interviewers[selectedInterviewer];
  
  return detailObj;

}