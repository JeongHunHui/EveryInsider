import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './styles/NavBar.css';

function NavBar({ typeKeyValues }: any) {
  const [array, setArray] = useState<string[][]>();
  useEffect(() => {
    console.log(typeKeyValues);
    setArray(typeKeyValues);
  }, []);
  return array ? (
    <nav className="navList">
      <ul>
        <NavLink to="/">
          <li className="navBar_first">전체</li>
        </NavLink>
        {array.map((data: string[]) => (
          <NavLink to={`/${data[0]}`}>
            <li className="navBar">{data[1]}</li>
          </NavLink>
        ))}
      </ul>
    </nav>
  ) : (
    <div />
  );
}

export default NavBar;
