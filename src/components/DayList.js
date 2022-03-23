import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const singleDay = props.days.map(single => {
    return (
        <DayListItem
          key={single.id}
          name={single.name}
          spots={single.spots}
          selected={single.name === props.day}
          setDay={props.setDay}
        />
    )
  });
  return (
    <ul>
      {singleDay}
    </ul>
  );
}
