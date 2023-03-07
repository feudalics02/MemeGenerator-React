import TrollFace from "./Images/trollface.png"

export default function Header() {
    return (
      <header className="header">
          <div className="logo-title">
              <img src={TrollFace} alt="logo" className="logo"></img>
              <h2 className="title">Meme Generator</h2>
          </div>
          <h3 className="secondary-title">React Course - Project 3</h3>
      </header>
    );
}