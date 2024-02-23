import logo from "../../logo1.png";

const Logo = () => {
  return (
    <img
      src={logo}
      style={{ filter: "invert(100%)", marginBottom: "2rem" }}
      className="App-logo"
      alt="logo"
    />
  );
};

export default Logo;