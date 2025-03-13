import { useState } from "react";

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

      let x = await response.json();
      setText(x.lyrics);
    } catch (error) {
      setText("Not Found!");
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center rounded-4xl bg-indigo-900 text-white max-w-xl max-h-5/12">
        <h1 className="m-4 font-bold text-2xl">Lyrics Finder</h1>
        <p className="mb-4">
          Find lyrics by entering artist and title of the song
        </p>
        <form action="" method="get" className="table" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <div className="m-6 flex flex-col">
              <label htmlFor="artist">Enter artist:</label>
              <input
                id="artist"
                name="artist"
                value={artist}
                onChange={handleArtist}
                type="text"
                placeholder="Enter artist"
                className="border border-black rounded text-gray-400 focus:border-emerald-500 focus:outline-emerald-500"
                required
              ></input>
            </div>
            <div className="mb-6 ml-6 mr-6 flex flex-col">
              <label htmlFor="title">Enter title:</label>
              <input
                id="title"
                name="title"
                value={title}
                onChange={handleTitle}
                type="text"
                className="border border-black rounded text-gray-400 focus:border-emerald-500 focus:outline-emerald-500"
                placeholder="Enter title"
                required
              ></input>
            </div>
            <button
              type="submit"
              className="border border-black rounded bg-emerald-700 hover:bg-emerald-500 active:bg-emerald-600"
              onClick={handleClick}
            >
              Search
            </button>
          </div>
        </form>
        <div id="output" className="m-6 overflow-auto scrollbar">
          {text}
        </div>
      </div>
    </>
  );
}

export default App;
