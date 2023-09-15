import React from "react";
import "./deletePrompt.css";
import NewModal from './addingModal';


const DeletePrompt = (props) => {
    const handleClose = () => {
        props.setOpen(false);
    }

    const executeDelete = () => {
        props.deleteFunction();
        handleClose();
    }
    return(
        <NewModal open = {props.open} setOpen = {props.setOpen}>
            <div className="delete-prompt">
                <div className="warning">
                    <div className="warning-header">
                        Are you sure?
                    </div>
                    <div className="warning-description">
                        This will delete the object permanently. This action cannot be undone
                    </div>
                </div>
                <div className="buttons">
                    <button className="no-button" onClick={handleClose}>Cancel</button>
                    <button className="yes-button" onClick={executeDelete}>Proceed</button>
                </div>
                
                
            </div>
        </NewModal>
    )
}

export default DeletePrompt;