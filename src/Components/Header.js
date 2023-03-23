import TrollFace from "./Images/troll.png"

export default function Header() {
    return (
      <header className="header">
          <div className="logo-title">
              <img src={TrollFace} alt="logo" className="logo"></img>
              <h2 className="title">Meme Generator</h2>
          </div>
          <h3 className="secondary-title">Your daily fun dose</h3>
      </header>
    );
}