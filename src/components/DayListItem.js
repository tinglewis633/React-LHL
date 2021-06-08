import React from "react";
import classNames from "classnames";
import "../styles/DayListItem.scss";

export default function DayListItem(props) {
  const dayListItemClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0,
  });

  const spotsRemain = classNames({
    "no spots remaining": props.spots === 0,
    "1 spot remaining": props.spots === 1,
    "2 spots remaining": props.spots === 2,
    "3 spots remaining": props.spots === 3,
    "4 spots remaining": props.spots === 4,
    "5 spots remaining": props.spots === 5,
    
  });

  return (
    <li onClick={() => props.setDay(props.name)}>
      <h2 className={dayListItemClass}>{props.name} <br></br> {spotsRemain}</h2>
  
    </li>
  );
}
