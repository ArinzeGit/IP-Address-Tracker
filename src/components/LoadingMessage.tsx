const LoadingMessage = () => {
  return (
    <div
      style={{
        fontFamily: "Rubik",
        fontWeight: " 700",
        fontSize: "1rem",
        color: "#3388ff",
        position: "absolute",
        left: "50%",
        top: "1px",
        transform: "translate(-50%)",
        zIndex:
          "402" /*to overlap leaflet map set by leaflet at 400 and result display set at 401 */,
      }}
    >
      Loading...
    </div>
  );
};

export default LoadingMessage;
