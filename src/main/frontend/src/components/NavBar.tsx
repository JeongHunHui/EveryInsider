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
        <li className="navBar_first">
          <NavLink to="/">전체</NavLink>
        </li>
        {array.map((data: string[]) => (
          <li className="navBar" key={data[0]}>
            <NavLink to={`/${data[0]}`}>{data[1]}</NavLink>
          </li>
        ))}
      </ul>
    </nav>
  ) : (
    <div />
  );
}

export default NavBar;
