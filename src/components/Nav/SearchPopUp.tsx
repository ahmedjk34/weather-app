import { Location } from "@/Types";
import React from "react";
import styles from "./Nav.module.scss";
type Props = {
  locations: Location[];
};

function SearchPopUp({ locations }: Props) {
  return (
    locations.length != 0 && (
      <div className={styles.searchPopup}>
        {locations.map((location, index) => (
          <h3 key={index + location.settlement}>
            {location.settlement}, {location.country}
          </h3>
        ))}
      </div>
    )
  );
}

export default SearchPopUp;
