interface Props {
  text: string;
}

const Heading = ({ text }: Props) => {
  return (
    <h1
      style={{
        margin: 0,
        color: "white",
        fontFamily: "Rubik",
        fontWeight: "500",
        fontSize: "1.965rem",
        textAlign: "center",
      }}
    >
      {text}
    </h1>
  );
};

export default Heading;
