"use client";
import { useEffect, useState } from "react";
import styles from "../styles/page/errorPage.module.scss";
import { usePathname, useRouter } from "next/navigation";

export default function NotFound() {
  const [countDown, setCountDown] = useState(3);
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    if (countDown > 0) {
      const timer = setTimeout(() => setCountDown(countDown - 1), 1000);
      return () => clearTimeout(timer); // Clean up the timer
    } else {
      const searchParams = new URLSearchParams();
      searchParams.set("city", "London");
      searchParams.set("units", "metric");
      router.push(pathname + "?" + searchParams.toString());
      window.location.href = pathname + "?" + searchParams.toString(); // Force a full page reload
    }
  }, [countDown]);

  return (
    <div className={styles.errorPage}>
      <h1>This page was not found!</h1>
      <p>You will be redirected to a random city in {countDown} seconds...</p>
    </div>
  );
}
