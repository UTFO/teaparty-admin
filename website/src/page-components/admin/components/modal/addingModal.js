import React from 'react'
import Modal from '@mui/material/Modal'
import './addingModal.css'

const NewModal = (props) => {
  const openState = props.open ? true : false
  const handleClose = () => { props.setOpen(false)}
  return (
    <Modal
      open={openState}
      onClose={handleClose}
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {props.children}
    </Modal>
  )
}

export default NewModal