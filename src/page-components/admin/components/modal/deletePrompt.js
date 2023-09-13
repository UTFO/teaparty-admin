import React from "react";
import "./deletePrompt.css";
import NewModal from './addingModal';


const DeletePrompt = (props) => {
    const handleClose = () => {
        props.setOpen(false);
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
                    <button className="no-button" onClick={handleClose}>No</button>
                    <button className="yes-button" onClick={props.deleteFunction}>Yes</button>
                </div>
                
                
            </div>
        </NewModal>
    )
}

export default DeletePrompt;