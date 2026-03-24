import { useState } from "react";
import {Music} from "lucide-react";

function App() {
  const url = "https://api.lyrics.ovh/v1/";
  const [artist, setArtist] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const handleArtist = (event: React.ChangeEvent<HTMLInputElement>) => {
    setArtist(event.target.value);
  };

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };

  const handleClick = async () => {
    let urlToFetch = url;
    urlToFetch += artist + "/" + title;
    try {
      const response = await fetch(urlToFetch);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const x = await response.json();
      setText(x.lyrics);
    } catch (error) {
      console.error("Error fetching lyrics:", error);
      setText("Not Found!");
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center rounded-4xl bg-[#1a1a1a] text-white max-w-2xl max-h-6/12 p-6 w-1/3">
        <div className="bg-[#1DB954] rounded-full mb-2 flex items-center justify-center w-14 h-14 min-w-14 min-h-14">
          <Music color="#000000" size={32}/>
        </div>
        <h1 className="mt-4 mr-4 ml-4 font-bold text-2xl text-white">Lyrics Finder</h1>
        <p className="mb-6 text-[#a0a0a0]">
          Search by artist and song title
        </p>
        <form action="" method="get" className="table w-full min-w-80 px-6" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="artist" className="text-[#a0a0a0] text-sm">Artist:</label>
              <input
                id="artist"
                name="artist"
                value={artist}
                onChange={handleArtist}
                type="text"
                placeholder="Eg. Beatles"
                className="w-full p-3 rounded-lg bg-[#2a2a2a] text-[#a0a0a0] focus:border-[#1DB954] focus:outline-[#1DB954]"
                required
              ></input>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="title" className="text-[#a0a0a0] text-sm">Song title:</label>
              <input
                id="title"
                name="title"
                value={title}
                onChange={handleTitle}
                type="text"
                className="w-full p-3 rounded-lg bg-[#2a2a2a] text-[#a0a0a0] focus:border-[#1DB954] focus:outline-[#1DB954]"
                placeholder="Eg. Let It Be"
                required
              ></input>
            </div>
            <button
              type="submit"
              className="w-full mt-2 p-3 border border-[#a0a0a0] rounded bg-[#1a1a1a] hover:bg-[#2a2a2a] active:bg-[#2a2a2a]"
              onClick={handleClick}
            >
              Search
            </button>
          </div>
        </form>
        <div id="output" className="m-4 w-full h-1/2 text-[#a0a0a0] overflow-auto scrollbar">
          {text}
        </div>
      </div>
    </>
  );
}

export default App;
