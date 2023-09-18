import "./aboutListContainer.css"

function AboutListContaniner(props){
    return (
    <div className="admin-about-container">
        <div className="header">
            <div className = "admin-about-title">{props.name}</div>
            <div className = "buttons">
                <button className="edit-button" onClick={props.editFunction}>
                    <img src="/pencil.png"></img>
                </button>
                <button className="delete-button" onClick={props.deleteFunction}>
                    <img src="/trash.png"></img>
                </button>
            </div>
        </div>
        <div className="admin-about-text">
            {props.text}
        </div>
    </div>
    )
}

export default AboutListContaniner