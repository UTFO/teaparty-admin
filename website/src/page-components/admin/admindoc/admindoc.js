import React from "react";
import "./admindoc.css";
import AdminNavbar from "../components/navbar/nav";
import Container from "../components/container/container";

import { useState , useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const AdminDoc = () => {
  var info = require("./admindoc.json")["list_of_headings"];

  const [activeHeading, setActiveHeading] = useState(0);
  const [activeSubheading, setActiveSubheading] = useState(0);

  const [subheadingsVisibility, setSubheadingsVisibility] = useState(
    Array(info.length).fill(false)
  );

  const toggleSubheadingsVisibility = (index) => {
    const updatedVisibility = [...subheadingsVisibility];
    updatedVisibility[index] = !updatedVisibility[index];
    setSubheadingsVisibility(updatedVisibility);
  };

  const setSubheading = (mainIndex, index) => {
    setActiveHeading(mainIndex);
    setActiveSubheading(index);
  };

  useEffect( () => {
    if (sessionStorage.getItem("accessToken") !== "true") {
      window.location.href = "/admin";
    }
  }, [])

  return (
    <div>
      <AdminNavbar />

      <Container text="Documentation">
        <div
          style={{ width: `95%`, minHeight: "60vh", display: "flex" }}
          className="admin-small-container"
        >
          <div style={{ width: "25%", marginTop: "3em", height: "100%" }}>
            {info.map((data, index) => {
              return (
                <div key={index} style={{ paddingBottom: "1.5em" }}>
                  <button
                    style={{
                      backgroundColor: "transparent",
                      border: "none",
                      fontSize: "1.6em",
                      cursor: "pointer",
                    }}
                    onClick={() => toggleSubheadingsVisibility(index)}
                  >
                    {subheadingsVisibility[index] ? "▾" : "▸"} {data["heading"]}
                  </button>

                  {subheadingsVisibility[index] && (
                    <div
                      style={{
                        marginLeft: "3em",
                        fontSize: "1.2em",
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.3em",
                        marginTop: "0.3em",
                        alignItems: "start",
                      }}
                    >
                      {data["subheadings"].map((subdata, indexTwo) => {
                        return (
                          <button
                            key={indexTwo}
                            style={{
                              backgroundColor: "transparent",
                              border: "none",
                              fontSize: "1em",
                              margin: 0,
                              cursor: "pointer",
                              opacity: "0.6",
                            }}
                            onMouseOver={(e) => (e.target.style.opacity = "1")}
                            onMouseOut={(e) => (e.target.style.opacity = "0.6")}
                            onClick={() => setSubheading(index, indexTwo)}
                          >
                            {subdata["subheading"]}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <div
            style={{
              width: "70%",
              borderLeft: "solid",
              borderWidth: "2px",
              borderColor: "rgb(200, 200, 200)",
              paddingLeft: "3em",
              paddingTop: "2em",
              paddingBottom: "2em",
            }}
          >
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ node, ...props }) => (
                  <h1 style={{ fontSize: "1.6em", fontWeight: "bold" }} {...props} />
                ),
                h2: ({ node, ...props }) => (
                  <h2 style={{ fontSize: "1.4em", fontWeight: "bold" }} {...props} />
                ),
                h3: ({ node, ...props }) => (
                  <h3 style={{ fontSize: "1.3em", fontWeight: "bold" }} {...props} />
                ),
                h4: ({ node, ...props }) => (
                  <h4 style={{ fontSize: "1.2em", fontWeight: "bold" }} {...props} />
                ),
                p: ({ node, ...props }) => (
                  <p style={{ fontSize: "1.2em"}} {...props} />
                ),
                li: ({node, ...props}) => (
                  <li style={{ fontSize: "1.2em"}} {...props} />
                )
              }}
            >
              {info[activeHeading]["subheadings"][activeSubheading]["text"].join('\n')}
            </ReactMarkdown>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AdminDoc;
