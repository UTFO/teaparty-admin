import "./teamListContainer.css"
import { fileNameToSrc } from "../../../../helper";

function TeamListContaniner(props){
    return (<div className="container">
        <div className="header">
            <div className = "person-intro">
                <img className="image" src={fileNameToSrc(props.image)}/>
                <p className="name">
                    {props.name}
                </p>
                
            </div>
            
            <div className="buttons">
                <button className="edit-button" onClick={props.editFunction}>
                    <img src="/pencil.png"></img>
                </button>
                <button className="delete-button" onClick={props.deleteFunction}>
                    <img src="/trash.png"></img>
                </button>
            </div>
        </div>
        <div className="text">
            {props.text}
        </div>
    </div>)
}

export default TeamListContaniner