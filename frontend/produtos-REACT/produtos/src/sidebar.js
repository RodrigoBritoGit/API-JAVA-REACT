import React from "react";


function Sidebar() {
  return (
    <nav className="sidebar">
      <ul className="list-unstyled components">
        <li className="active">
          <a href="#">Home</a>
        </li>
        <li>
          <a href="#">Produtos</a>
        </li>
        <li>
          <a href="#">Clientes</a>
        </li>
      </ul>
    </nav>
  );
}

export default Sidebar;
