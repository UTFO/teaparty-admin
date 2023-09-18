import React, { createContext, useContext, useEffect, useState } from "react";
import { getTeam } from "../../api/team"; // Make sure to provide the correct path to your team API

const TeamDataContext = createContext();

let displaySide = 2 + 2;

export function TeamDataProvider({ children }) {
    const [Teams, setTeams] = useState([]);
    console.log("Test")

    const preloadTeam = () => {
      getTeam().then((data) => {
        var tempTeams = [];
        data.map((info) => {
          // Convert the binary data to a Base64-encoded string
          tempTeams = [
            ...tempTeams,
            { name: info.name, message: info.message, image: info.image, role: info.role, linkedin: info.linkedin, instagram: info.instagram, twitter: info.twitter },
          ];
        });
        console.log(tempTeams)
        var memberArray = []
        while (memberArray.length < 3 * (displaySide * 2 + 1))
            memberArray = [...memberArray, ...tempTeams];

        setTeams(memberArray);
      });
    };
  
    useEffect(() => {
      preloadTeam();
    }, []);

  return (
    <TeamDataContext.Provider value={Teams}>
      {children}
    </TeamDataContext.Provider>
  );
}

export function useTeamData() {
  return useContext(TeamDataContext);
}