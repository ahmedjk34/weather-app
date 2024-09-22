"use client";

import { extractLocations } from "@/lib/util";
import styles from "./Nav.module.scss";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Location } from "@/Types";

type Props = {};

function Nav({}: Props) {
  const [query, setQuery] = useState("");
  const [extractedLocations, setExtractedLocations] = useState<Location[]>([]);

  // Create a debounced version of extractLocations
  const getExtractedLocations = useCallback(
    debounce(async (query: string) => {
      //if the input is less than 3, don't run a search and set the extracted locations to be empty(So the search suggestion would be empty)
      if (query.length < 3) {
        setExtractedLocations([]);
        return;
      }
      const locations = await extractLocations(query);
      setExtractedLocations(locations);
    }, 500),
    []
  );

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    getExtractedLocations(value);
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

//debounce function
export function debounce(func: Function, delay: number) {
  let timeoutId: NodeJS.Timeout;
  return (...args: any[]) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

export default Nav;
