'use client'
import React from 'react'
import "@fortawesome/fontawesome-svg-core/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import {
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
type Props = {
  id: string,
  setAllJobs: any,
}

function deleteButton({ id, setAllJobs }: Props) {
  async function handleDelete() {
    const res = await fetch('/api/delete', {
      method: "DELETE",
      headers: {
        'Content-type': 'application/json'
      },
      cache: 'no-store',
      body: JSON.stringify({ id: id })
    })
    const allJobs = await res.json()
    console.log(allJobs,'alljobs in deletebutton')
    setAllJobs(allJobs.allJobs)
  }
  return (
    <div className='self-center' onClick={handleDelete}>
      <FontAwesomeIcon
        icon={faTrashCan}
        style={{ fontSize: 25, color: "black" }}
      /></div>
  )
}


export default deleteButton