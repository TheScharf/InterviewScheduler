import React from "react";
import Button from "components/Button";

export default function Confirm(props) {
  //// confirms if user would like to delete their appointment ////
  return(
    <main className="appointment__card appointment__card--confirm">
      <h1 className="text--semi-bold">Are you sure you would like to delete?</h1>
      <section className="appointment__actions">
        <Button danger onClick={props.onCancel}>Cancel</Button>
        <Button danger onClick={props.onConfirm}>Confirm</Button>
      </section>
    </main>
  )
}