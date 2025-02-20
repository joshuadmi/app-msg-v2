import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <div>
      <ul>
        <NavLink to={"/"}>
          <li>Accueil</li>
        </NavLink>

        <NavLink to={"/chat"}>
          <li>Chat</li>
        </NavLink>
      </ul>
    </div>
  );
};

export default Navigation;
