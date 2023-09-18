import React, {useEffect} from "react";
import "./admindashboard.css";

import AdminNavbar from "../components/navbar/nav";
import Container from "../components/container/container";
import SmallContainer from "../components/smallContainer/smallContainer";

function AdminDashboardButton(props) {
  return (
    <a className="admin-dashboard-button" href={props.link}>
      <section style={{ backgroundColor: props.color }}>
        <img src={props.image} />
      </section>
      <h4>{props.children}</h4>
    </a>
  );
}

const AdminDashboard = () => {
  useEffect( () => {
    if (sessionStorage.getItem("accessToken") !== "true") {
      console.log("GG LMAO")
      window.location.href = "/admin";
    }
  }, [])
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <AdminNavbar />

      <Container text="Dashboard">
        {/* Top white container */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            marginBottom: 80,
          }}
        >
          <SmallContainer
            title="Manage Pages"
            subtitle="Click on an icon to edit the respective page contents!"
            width={100}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                width: "100%",
              }}
            >
              <AdminDashboardButton
                image="/home.png"
                color="#B8E4E4"
                link="/admin/pages/home"
              >
                Home
              </AdminDashboardButton>
              <AdminDashboardButton
                image="/about.png"
                color="#76FFC4"
                link="/admin/pages/about"
              >
                About
              </AdminDashboardButton>
              <AdminDashboardButton
                image="/team.png"
                color="#76F8FF"
                link="/admin/pages/team"
              >
                Team
              </AdminDashboardButton>
              <AdminDashboardButton
                image="/events.png"
                color="#D1E59D"
                link="/admin/pages/events"
              >
                Event
              </AdminDashboardButton>
              <AdminDashboardButton
                image="/faq.png"
                color="#6FABFF"
                link="/admin/pages/faq"
              >
                FAQ
              </AdminDashboardButton>
            </div>
          </SmallContainer>
        </div>

        {/* Two Bottom white containers */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            paddingBottom: 80,
          }}
        >
          <SmallContainer
            title="Read Documentation"
            subtitle="Learn the website structure and how to manage it!"
            width={40}
          >
            <div
              style={{
                marginLeft: "auto",
                marginRight: "auto",
                width: "fit-content",
              }}
            >
              <AdminDashboardButton
                image="/documentation.png"
                color="#CECECE"
                link="/admin/doc"
              >
                Documentation
              </AdminDashboardButton>
            </div>
          </SmallContainer>

          <SmallContainer
            title="Change Admin Account"
            subtitle="Edit admin accounts that accesses this dashboard!"
            width={40}
          >
            <div
              style={{
                marginLeft: "auto",
                marginRight: "auto",
                width: "fit-content",
              }}
            >
              <AdminDashboardButton
                image="/account.png"
                color="#CECECE"
                link="/admin"
              >
                Account
              </AdminDashboardButton>
            </div>
          </SmallContainer>
        </div>
      </Container>
    </div>
  );
};

export default AdminDashboard;
