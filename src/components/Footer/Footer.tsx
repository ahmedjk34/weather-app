import React from "react";
import styles from "./footer.module.scss";
import { FaGithub } from "react-icons/fa6";
import Link from "next/link";
type Props = {};

function Footer({}: Props) {
  return (
    <div className={styles.footer}>
      <h3>Forecastly© - a Mock Weather app</h3>
      <h3>
        Made by <Link href={"https://github.com/ahmedjk34"}>Ahmedjk34</Link> on
        github <FaGithub />
      </h3>
      {/*Add github repo link*/}
      <h3>
        <Link href={"https://github.com/ahmedjk34/weather-app"}>
          Source code
        </Link>
      </h3>
    </div>
  );
}

export default Footer;
