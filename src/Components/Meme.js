import React, {useState, useEffect, useRef} from "react";
import data from "../data.js";
import Draggable from "react-draggable";

export default function Meme() {
    const [meme, setMeme] = React.useState({
        topText: "",
        bottomText: "",
        additionalText: "",
        randomImage: "https://i.imgflip.com/1bij.jpg"
    });

    const [allMemes, setAllMemes] = useState(data.data.memes);

    const [additionalText, setAdditionalText] = useState(false);

    const ref = useRef(null);

    const [drag, setDrag] = useState({
        topText: false,
        bottomText: false,
        additionalText: false
    });

    useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
        .then(data => data.json())
        .then(memes => setAllMemes(memes.data.memes));
    }, []);

    const handleChange = (event) => {
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
    };

    const getImage = () => {
        const index = Math.floor(Math.random() * allMemes.length);
        setMeme(function(prevMeme) {
            return {
                ...prevMeme,
                randomImage: allMemes[index].url
            };
        });
    };

    const handleDrag = (text) => {
        setDrag(prevState => {
            return {...prevState, [text]: true}
        });
    };

    const handleClicked = () => {
        if (additionalText) {
            setMeme(prevState => {
                return {
                    ...prevState,
                    additionalText: ""
                }
            });
        }
        setAdditionalText(prevState => !prevState);
    };

    const downloadImage = async () => {
        const response = await fetch(meme.randomImage);
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "meme-" + Date.now() + ".png";
        link.click();
        URL.revokeObjectURL(url);
    };

    return (
      <main className="meme">
          <section className="input">
              <div className="third-text">
                  {additionalText && <input width="200px" className="box" autoComplete="off" maxLength={20} name="additionalText" id="third-text" onChange={handleChange} value={meme.additionalText} placeholder="Additional text"></input>}
                  <button className="image-button" onClick={handleClicked}>{additionalText ? "Remove additional text" : "Add additional text"}</button>
              </div>

              <div className="boxes">
                  <input className="box" autoComplete="off" maxLength={20} name="topText" onChange={handleChange} value={meme.topText} placeholder="Top text"></input>
                  <input className="box" autoComplete="off" maxLength={20} name="bottomText" onChange={handleChange} value={meme.bottomText} placeholder="Bottom text"></input>
              </div>

              <button className="image-button" onClick={getImage}>Get a new meme image</button>

              <div className="boxes">
                  <button className="image-button" id="download-button" onClick={downloadImage}>Download image as PNG</button>
              </div>
          </section>

          <section className="meme-content">
              <img ref={ref} src={meme.randomImage} alt="" className="meme-image"></img>
              <Draggable onDrag={() => handleDrag("topText")} position={!drag.topText ? {x: 40, y: -480} : null} className="draggable" bounds="parent">
                  <h2 className="meme-text" id="top-text">{meme.topText}</h2>
              </Draggable>

              {additionalText &&
                  <Draggable onDrag={() => handleDrag("additionalText")} position={!drag.additionalText ? {x: 40, y: -290} : null} className="draggable" bounds="parent">
                    <h2 className="meme-text" id="additional-text">{meme.additionalText}</h2>
                  </Draggable>}

              <Draggable onDrag={() => handleDrag("bottomText")} position={!drag.bottomText ? {x: 40, y: -100} : null} className="draggable" bounds="parent">
                  <h2 className="meme-text" id="bottom-text">{meme.bottomText}</h2>
              </Draggable>
          </section>
      </main>
    );
}