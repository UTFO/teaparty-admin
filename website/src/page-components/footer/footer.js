import "./footer.css";

import TeaPartyIcon from "./images/UofTeaGray.png";

function Footer() {
  return (
    <>
      <div className="footer-section">
        <div>
          <svg viewBox="0 0 1000 100">
            <path
              d="M0,165 L0,2
                        C0,2 100,0 200,60 
                        C200,60 260,100 350,100
                        C350,100 450,100 500,77 
                        C500,77 600,40 650,45
                        C650,45 700,45 750,60
                        C750,60 800,80 825,80   
                        C825,80 900,85 950,60
                        C950,60 985,45 1000,45
                        L1000,100 0,100 Z"
            />
          </svg>
        </div>

        <div className="footer-section-info">
          <img src={TeaPartyIcon} />
          <section>
            <p>©2023 University of Toronto (UofT) Tea Party</p>
            <p>
              Website designed by University of Toronto Freelancer's
              Organization
            </p>
            <p>Icon designed by UofT Tea Party</p>
          </section>
        </div>
      </div>
    </>
  );
}

export default Footer;
