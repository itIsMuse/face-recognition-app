import React from 'react'
import { NavLink } from "react-router-dom"


const Nav = ({isAuthenticated}) => {

  return (
    <nav>
      <ul style={{ display: "flex", justifyContent: "flex-end",  listStyle: "none", padding: 0 }}>
        <li style={{ marginRight: "20px" }}>
          <NavLink
            to="/signin"
            style={({ isActive }) => ({
              fontWeight: isActive ? "bold" : "normal",
              color: isActive ? "white" : "white",
              textDecoration: "none",
              borderBottom: isActive ? "2px solid blue" : "none", // Subtle border for active link
            })}
          >
            Sign In
          </NavLink>
        </li>
        <li style={{ marginRight: "20px" }}>
          <NavLink
            to="/register"
            style={({ isActive }) => ({
              fontWeight: isActive ? "bold" : "normal",
              color: isActive ? "white" : "white",
              textDecoration: "none",
              borderBottom: isActive ? "2px solid blue" : "none", // Subtle border for active link
            })}
          >
            Register
          </NavLink>
        </li>
        {isAuthenticated && (
          <li>
            <NavLink
              to="/home"
              style={({ isActive }) => ({
                fontWeight: isActive ? "bold" : "normal",
                color: isActive ? "white" : "white",
                textDecoration: "none",
                borderBottom: isActive ? "2px solid blue" : "none", // Subtle border for active link
              })}
            >
              Home
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  
  )

}
export default Nav
