import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { NavLink } from "react-router-dom";
import SubMenu from "./SubMenu";

function MenuList({ menus, ...props }) {
  return (
    <div className="navWrapper p-4">
      <ul id="menu" className="">
        {menus?.map((menu) =>
          menu.submenu ? (
            <SubMenu key={menu.label} menu={menu} props={props} />
          ) : menu.path ? (
            <li key={menu.label} className={``} onClick={props.toggle}>
              <NavLink to={`${menu.path}`} className="link p-4 space-x-2">
                {menu.icon && <FontAwesomeIcon className="mr-3 sm:mr-0" icon={menu.icon} />}
                {menu.label}
              </NavLink>
            </li>
          ) : (
            <li key={menu.label} className="mt-5 mb-3">
              <span className="text-gray-500 font-medium uppercase text-xs mx-2">
                {menu.label} {menu.role}
              </span>
            </li>
          )
        )}
      </ul>
    </div>
  );
}

export default MenuList;
