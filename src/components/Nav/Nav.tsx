"use client";

import styles from "./Nav.module.scss";
import Image from "next/image";
import React from "react";
import { FaSearch } from "react-icons/fa";

type Props = {};

function Nav({}: Props) {
  return (
    <div className={styles.nav}>
      <Image src={"/logo.png"} alt="logo" width={160} height={80}></Image>
      <div className={styles.inputHolder}>
        <input type="text" name="search"></input>
        <FaSearch className={styles.icon} />
      </div>
      <div>
        <div className={styles.buttonHolder}>
          <button>°F, mph</button>
          <button>°C, m/s</button>
        </div>
      </div>
    </div>
  );
}

export default Nav;
