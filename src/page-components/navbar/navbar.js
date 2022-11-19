import './navbar.css';

function MenuButton(props) {
    return (
        <a href={props.path}>
            <p>{props.text}</p>
        </a>
    )
}

function ContactButton(props) {
    return (
        <button>
            <img src={props.image} alt={props.text}/>
        </button>
    )
}


function Navbar() {
    

    return <>
        <div className="navbar-menu">
            <section className="club-icon">
                <img src="" alt="Club Icon"/>
            </section>

            <MenuButton text="About" path="/about"/>
            <MenuButton text="Team" path="/team"/>
            <MenuButton text="Events" path="/about"/>
            <MenuButton text="FAQ" path="/about"/>

        </div>


        <div className="navbar-contact">
            <ContactButton text="Email"/>
            <ContactButton text="Instagram"/>
        </div>

    </>
}

export default Navbar;