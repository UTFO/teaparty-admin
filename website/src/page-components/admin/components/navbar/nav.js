import "./nav.css";
import { useLocation } from "react-router-dom";
import { useState } from 'react'

function NavButton(props) {
  return (
    <a className="admin-nav-button" href={props.link}>
      <img src={props.image} style={{ opacity: props.enable ? 1 : 0.5 }} />
      <p style={{ opacity: props.enable ? 1 : 0.5 }}>{props.text}</p>
    </a>
  );
}

export default function AdminNavbar() {
  
  const [togglePages, setTogglePages] = useState(false);

  return (
    <div style={{ zIndex: 20 }}>
      <div className="admin-nav-bottom">
        <div className="admin-nav-logo">
          <img src="/adminLogo.png" />
        </div>
        <div className="admin-nav-container">
          <NavButton
            image="/dashboard.png"
            text="Dashboard"
            enable={useLocation().pathname == "/admin/dashboard"}
            link="/admin/dashboard"
          />
          <div>
            <button className="admin-nav-button" onClick={() => setTogglePages((prev) => !prev)}>
              <img src="/page.png" style={{ opacity: useLocation().pathname.includes("/admin/page") ? 1 : 0.5 }} />
              <p style={{ opacity: useLocation().pathname.includes("/admin/page") ? 1 : 0.5 }}>Pages <span style={{position: 'relative', top: togglePages ? '2px' : 0}}>{togglePages ? '▾' : '▸'}</span></p>
            </button>
            <div className="admin-nav-page-dropdown" style={{opacity: togglePages ? 1 : 0}}>
              {pageLinks.map((page) => {
                return <a href={"/admin/pages/" + page}>{page}</a>
              })}
            </div>
          </div>
          <NavButton
            image="/documents.png"
            text="Documentation"
            enable={useLocation().pathname == "/admin/doc"}
            link="/admin/doc"
          />
        </div>
      </div>
    </div>
  );
}

const pageLinks = [
  "home",
  "about",
  "team",
  "events",
  "faq"
]
