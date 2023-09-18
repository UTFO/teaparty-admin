import React from "react";
import "./faqPage.css";
import Column from "./questionColumn";

import { FAQText } from "../page-introductions/imports.js";

import PageIntro from "../page-introductions/PageIntro.js";
import { Navbar, Footer } from "../imports.js";

function FAQ() {
  return (
    <>
      <Navbar />
      <div className="page-introduction">
        <PageIntro title={FAQText.title} text={FAQText.text} page="faq" />
      </div>
      <div className="page-component">
        <div className="page">
          <Column />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default FAQ;
