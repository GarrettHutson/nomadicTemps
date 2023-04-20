'use client'
import React from 'react'
import "@fortawesome/fontawesome-svg-core/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { config } from "@fortawesome/fontawesome-svg-core";
import { useGlobalContext } from '../context/store';
config.autoAddCss = false;
import {
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
type Props = {
  id: string,

}
export const revalidate = 0
function DeleteButton({ id }: Props) {
  const {allJobs, setAllJobs} = useGlobalContext();

  async function handleDelete() {
    const timestamp = Date.now();
    const urlWithTimestamp = `/api/delete?t=${timestamp}`;
    const res = await fetch(urlWithTimestamp, {
      method: "DELETE",
      headers: {
        'Content-type': 'application/json'
      },
      cache: 'no-store',
      body: JSON.stringify({ id: id })
    })
    const allJobs = await res.json()

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


export default DeleteButton