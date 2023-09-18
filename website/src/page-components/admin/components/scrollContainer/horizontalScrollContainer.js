import "./horizontalScrollContainer.css"

function HorizontalScrollContainer(props){
    return (
    <div className="scrollbar">
    
        <div className="button">
            <button className="add-button" onClick={props.handleOpen}>
                <img src = "/plus.png"/>
            </button>
        </div>
        
        <div className="scroll-area">
            {props.children}
        </div>
        
    </div>)
}

export default HorizontalScrollContainer;