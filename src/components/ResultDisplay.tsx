import "./ResultDisplay.css";

interface Props {
  ipAddress: string;
  location: string;
  timezone: string;
  isp: string;
}
const ResultDisplay = ({ ipAddress, location, timezone, isp }: Props) => {
  return (
    <div className="result-display">
      <div className="result">
        <p className="result-title">IP ADDRESS</p>
        <p className="result-content">{ipAddress}</p>
      </div>
      <div className="result">
        <p className="result-title">LOCATION</p>
        <p className="result-content">{location}</p>
      </div>
      <div className="result">
        <p className="result-title">TIMEZONE</p>
        <p className="result-content">{timezone}</p>
      </div>
      <div className="result">
        <p className="result-title">ISP</p>
        <p className="result-content">{isp}</p>
      </div>
    </div>
  );
};

export default ResultDisplay;
