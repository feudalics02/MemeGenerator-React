import React from "react";
import data from "../data.js";

export default function Meme() {
    const [meme, setMeme] = React.useState({
        topText: "",
        bottomText: "",
        randomImage: "https://i.imgflip.com/1bij.jpg"
    });

    const [allMemes, setAllMemes] = React.useState(data.data.memes);

    React.useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
        .then(data => data.json())
        .then(memes => setAllMemes(memes.data.memes));
    }, []);

    function handleChange(event) {
        const {name, value} = event.target;
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
        console.log(meme);
    }

    return (
      <main className="meme">
          <div className="boxes">
              <input className="box" name="topText" onChange={handleChange} value={meme.topText} placeholder="Top text"></input>
              <input className="box" name="bottomText" onChange={handleChange} value={meme.bottomText} placeholder="Bottom text"></input>
          </div>
          <button className="image-button" onClick={getImage}>Get a new meme image</button>
          <div className="meme">
              <img src={meme.randomImage} alt="" className="meme-image"></img>
              <h2 className="meme-text" id="top-text">{meme.topText}</h2>
              <h2 className="meme-text" id="bottom-text">{meme.bottomText}</h2>
          </div>
      </main>
    );
}