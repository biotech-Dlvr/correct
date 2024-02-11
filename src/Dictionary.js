import React, { useState } from "react";
import axios from "axios";
import "./Dictionary.css";
import Results from "./Results";
import Photos from "./Photos";
import Meaning from "./Meaning";
import Synonyms from "./synonyms";
import Phonetic from "./Phonetic";

export default function Dictionary(props) {
  const [keyword, setKeyword] = useState(props.defaultKeyword);
  const [loaded, setLoaded] = useState(false);
  const [definition, setDefinition] = useState(null);
  const [photos, setPhotos] = useState([]);

  function handleImages(response) {
    setPhotos(response.data.photos);
  }

  function handleResponse(response) {
    setDefinition(response.data);
    let apiKey = "eac360db5fc86ft86450f3693e73o43f";
    let apiUrl = `https://api.shecodes.io/images/v1/search?query=${response.data.word}&key=${apiKey}`;
    axios
      .get(apiUrl, { headers: { Authorization: `Bearer ${apiKey}` } })
      .then(handleImages);
  }

  function load() {
    setLoaded(true);
    search();
  }

  function search() {
    let apiKey = "eac360db5fc86ft86450f3693e73o43f";
    let apiUrl = `https://api.shecodes.io/dictionary/v1/define?word=${keyword}&key=${apiKey}`;
    axios.get(apiUrl).then(handleResponse);
  }

  function handleSubmit(event) {
    event.preventDefault();
    search();
  }

  function handleKeywordChange(event) {
    setKeyword(event.target.value);
  }

  if (loaded) {
    return (
      <div className="Dictionary">
        <section>
          <div className="app-container">
            <form className="form-wrapper" onSubmit={handleSubmit}>
              <label>What word do you want to look up?</label>
              <input
                type="search"
                placeholder="Search for a word"
                defaultValue={props.defaultKeyword}
                autoFocus={true}
                id="form-control-input"
                onChange={handleKeywordChange}
              />
              <button id="search">Search</button>
            </form>
            <Results definition={definition} />
            <Phonetic />
            <Meaning />
            <Synonyms />
            <Photos photos={photos} />
          </div>
        </section>
      </div>
    );
  } else {
    load();
    return "Loading!";
  }
}
