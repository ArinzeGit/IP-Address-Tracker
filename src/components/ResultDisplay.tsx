import styles from "./ResultDisplay.module.css";

interface Props {
  ipAddress: string;
  location: string;
  timezone: string;
  isp: string;
}
const ResultDisplay = ({ ipAddress, location, timezone, isp }: Props) => {
  return (
    <div className={styles["result-display"]}>
      <div className={styles["result"]}>
        <p className={styles["result-title"]}>IP ADDRESS</p>
        <p className={styles["result-content"]}>{ipAddress}</p>
      </div>
      <div className={styles["result"]}>
        <p className={styles["result-title"]}>LOCATION</p>
        <p className={styles["result-content"]}>{location}</p>
      </div>
      <div className={styles["result"]}>
        <p className={styles["result-title"]}>TIMEZONE</p>
        <p className={styles["result-content"]}>{timezone}</p>
      </div>
      <div className={styles["result"]}>
        <p className={styles["result-title"]}>ISP</p>
        <p className={styles["result-content"]}>{isp}</p>
      </div>
    </div>
  );
};

export default ResultDisplay;
