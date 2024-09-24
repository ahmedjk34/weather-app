"use client";

import styles from "./nav.module.scss";
import Image from "next/image";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Props = {};

function Nav({}: Props) {
  const [query, setQuery] = useState("");
  const currentSearchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
  };
  const handleSearch = () => {
    const updatedSearchParams = new URLSearchParams(
      currentSearchParams.toString()
    );
    updatedSearchParams.set("city", query);
    router.push(pathname + "?" + updatedSearchParams.toString());
  };
  const handleUnitChange = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const updatedSearchParams = new URLSearchParams(
      currentSearchParams.toString()
    );
    //@ts-ignore
    updatedSearchParams.set("units", e.target.id);
    router.push(pathname + "?" + updatedSearchParams.toString());
  };
  return (
    <div className={styles.nav}>
      <Image
        src={"/logo.png"}
        alt="logo"
        width={160}
        height={80}
        priority
      ></Image>
      <div className={styles.inputHolder}>
        <input
          type="text"
          name="search"
          autoComplete="off"
          onChange={(e) => handleInputChange(e)}
        ></input>
        <FaSearch className={styles.icon} onClick={handleSearch} />
      </div>
      <div>
        <div className={styles.buttonHolder}>
          <button onClick={(e) => handleUnitChange(e)} id="imperial">
            °F, mph
          </button>
          <button onClick={(e) => handleUnitChange(e)} id="metric">
            °C, m/s
          </button>
        </div>
      </div>
    </div>
  );
}

export default Nav;
