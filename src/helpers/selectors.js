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