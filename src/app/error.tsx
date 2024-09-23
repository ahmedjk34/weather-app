"use client";
import { useEffect, useState } from "react";
import styles from "../styles/page/errorPage.module.scss";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const [countDown, setCountDown] = useState(3);
  const router = useRouter();
  const currentSearchParams = useSearchParams();
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
    }
  }, [countDown]);

  return (
    <div className={styles.errorPage}>
      <h1>Something went wrong!</h1>
      <p>You will be redirected to a random city in {countDown} seconds...</p>
    </div>
  );
}
