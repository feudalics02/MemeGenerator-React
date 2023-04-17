import React from "react";
import data from "../data.js";
import Draggable from "react-draggable";

export default function Meme() {
    const [meme, setMeme] = React.useState({
        topText: "",
        bottomText: "",
        additionalText: "",
        randomImage: "https://i.imgflip.com/1bij.jpg"
    });

    const [allMemes, setAllMemes] = React.useState(data.data.memes);

    const [thirdText, setThirdText] = React.useState(false);

    const [drag, setDrag] = React.useState({
        topText: false,
        bottomText: false,
        additionalText: false
    });

    React.useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
        .then(data => data.json())
        .then(memes => setAllMemes(memes.data.memes));
    }, []);

    function handleChange(event) {
        const {name, value} = event.target;
        setDrag(prevState => {
            return {...prevState, [name]: false}
        });
        setMeme(prevState => {
            return {
                ...prevState,
                [name]: value
            }
        });
    }

    function getImage() {
        const index = Math.floor(Math.random() * allMemes.length);
        setMeme(function(prevMeme) {
            return {
                ...prevMeme,
                randomImage: allMemes[index].url
            };
        });
    }

    function handleDrag(text) {
        setDrag(prevState => {
            return {...prevState, [text]: true}
        });
    }

    function handleClicked() {
        if (thirdText) {
            setMeme(prevState => {
                return {
                    ...prevState,
                    additionalText: ""
                }
            });
        }
        setThirdText(prevState => !prevState);
    }

    return (
      <main className="meme">
          <div className="input">
              <div className="third-text">
                  {thirdText && <input width="200px" className="box" autoComplete="off" maxLength={20} name="additionalText" id="third-text" onChange={handleChange} value={meme.additionalText} placeholder="Additional text"></input>}
                  <button className="image-button" onClick={handleClicked}>{thirdText ? "Remove additional text" : "Add additional text"}</button>
              </div>
              <div className="boxes">
                  <input className="box" autoComplete="off" maxLength={20} name="topText" onChange={handleChange} value={meme.topText} placeholder="Top text"></input>
                  <input className="box" autoComplete="off" maxLength={20} name="bottomText" onChange={handleChange} value={meme.bottomText} placeholder="Bottom text"></input>
              </div>
              <button className="image-button" onClick={getImage}>Get a new meme image</button>
          </div>
          <div className="meme-content">
              <img src={meme.randomImage} alt="" className="meme-image"></img>
              <Draggable onDrag={() => handleDrag("topText")} position={!drag.topText ? {x: 40, y: -480} : null} className="draggable" bounds="parent">
                  <h2 className="meme-text" id="top-text">{meme.topText}</h2>
              </Draggable>

              {thirdText &&
                  <Draggable onDrag={() => handleDrag("additionalText")} position={!drag.additionalText ? {x: 40, y: -290} : null} className="draggable" bounds="parent">
                    <h2 className="meme-text" id="additional-text">{meme.additionalText}</h2>
                  </Draggable>}

              <Draggable onDrag={() => handleDrag("bottomText")} position={!drag.bottomText ? {x: 40, y: -100} : null} className="draggable" bounds="parent">
                  <h2 className="meme-text" id="bottom-text">{meme.bottomText}</h2>
              </Draggable>
          </div>
      </main>
    );
}