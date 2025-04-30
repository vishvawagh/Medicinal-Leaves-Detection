import "../css/Home.css";
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

function Home() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [plantInfo, setPlantInfo] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadType, setUploadType] = useState("Plant");
  const [votes, setVotes] = useState({ upvotes: 0, downvotes: 0 });
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem("plantHistory");
    return saved ? JSON.parse(saved) : [];
  });

  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([
    { from: "bot", text: "Hi! Ask me anything about medicinal plants 🌿" },
  ]);
  const [chatLoading, setChatLoading] = useState(false);
  const recognitionRef = useRef(null);
  const [listening, setListening] = useState(false);

  const [search, setSearch] = useState("");
  const [usageFilter, setUsageFilter] = useState("");
  const [filteredPlants, setFilteredPlants] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get("http://localhost:5000/history");
        setHistory(res.data);
      } catch (err) {
        console.error("Error fetching history:", err);
      }
    };

    fetchHistory();
  }, []);


  useEffect(() => {
    fetchFilteredPlants();
  }, [search, usageFilter]);

  const fetchFilteredPlants = async () => {
    try {
      const res = await axios.get("http://172.17.0.2:5000/search", {
        params: { name: search, usage: usageFilter },
      });
      setFilteredPlants(res.data);
    } catch (error) {
      console.error("Error fetching filtered plants:", error);
    }
  };

  const fetchVotes = async (plantName) => {
    try {
      const res = await axios.get(`http://172.17.0.2:5000/votes/${encodeURIComponent(plantName)}`);
      setVotes(res.data);
    } catch (err) {
      console.error("Error fetching votes:", err);
    }
  };

  const sendVote = async (type) => {
    if (!plantInfo?.Name) return;

    try {
      await axios.post("http://172.17.0.2:5000/vote", {
        plant_name: plantInfo.Name,
        type: type,
      });
      fetchVotes(plantInfo.Name);
    } catch (err) {
      console.error("Vote error:", err);
    }
  };

  const onFileUpload = async () => {
    if (!selectedFile) {
      setError("Please select a file before uploading.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("uploadType", uploadType);

    try {
      const response = await axios.post("http://172.17.0.2:5000/predict", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data && Object.keys(response.data).length > 0) {
        setPlantInfo(response.data);
        suggestQuery(response.data);
        fetchVotes(response.data.Name);

        // Save prediction to history
        await axios.post("http://172.17.0.2:5000/update-history", response.data);

        // Refresh frontend history
        fetchHistory();
      } else {
        setError("No plant data found.");
      }
    } catch (err) {
      console.error("Prediction error:", err);
      setError(err.response?.data?.error || "Error uploading file.");
    } finally {
      setLoading(false);
    }
  };

  const fetchHistory = async () => {
    try {
      const res = await axios.get("http://172.17.0.2:5000/history");
      if (Array.isArray(res.data)) {
        setHistory(res.data);
      } else {
        console.warn("History is not an array:", res.data);
        setHistory([]);
      }
    } catch (err) {
      console.error("Error fetching history:", err);
    }
  };

  const clearHistory = async () => {
    try {
      await axios.post("http://172.17.0.2:5000/clear-history");
      setHistory([]);
    } catch (err) {
      console.error("Failed to clear history:", err);
    }
  };


  const onFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setPlantInfo(null);
    setError(null);
    setVotes({ upvotes: 0, downvotes: 0 });

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const clear = () => {
    setPlantInfo(null);
    setSelectedFile(null);
    setError(null);
    setImagePreview(null);
    setVotes({ upvotes: 0, downvotes: 0 });
  };

  const sendChat = async (customMessage) => {
    const message = (customMessage || chatInput).trim();
    if (!message) return;

    setChatMessages((prev) => [...prev, { from: "user", text: message }]);
    setChatLoading(true);
    setChatInput("");

    try {
      const res = await axios.post("http://172.17.0.2:5000/chat", { message });
      setChatMessages((prev) => [...prev, { from: "bot", text: res.data.reply || "No response." }]);
    } catch (err) {
      console.error("Chat error:", err);
      setChatMessages((prev) => [...prev, { from: "bot", text: "Error getting response." }]);
    } finally {
      setChatLoading(false);
    }
  };

  const suggestQuery = (info) => {
    const name = info?.Name?.split(" ")[0] || "this plant";
    const suggestions = [
      `What are the health benefits of ${name}?`,
      `Can ${name} be used for common cold?`,
      `Where is ${name} commonly found?`,
    ];
    setChatMessages((prev) => [
      ...prev,
      { from: "bot", text: "Here are some questions you can ask:" },
      ...suggestions.map((text) => ({ from: "suggestion", text })),
    ]);
  };

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice recognition not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const voiceText = event.results[0][0].transcript;
      setChatInput(voiceText);
    };

    recognition.onerror = (e) => console.error("Speech error:", e);
    recognition.onend = () => setListening(false);

    recognition.start();
    recognitionRef.current = recognition;
    setListening(true);
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
    setListening(false);
  };

  const clearChat = () => {
    setChatMessages([
      { from: "bot", text: "Hi! Ask me anything about medicinal plants 🌿" },
    ]);
  };

  return (
    <div className="container">
      <h2>Medicinal Plant Detection System</h2>
      <b>Select whether you're uploading a plant or a leaf image:</b>
      <div className="selection-buttons">
        <button
          type="button"
          className={uploadType === "Plant" ? "active" : ""}
          onClick={() => setUploadType("Plant")}
        >
          Plant
        </button>
        <button
          type="button"
          className={uploadType === "Leaf" ? "active" : ""}
          onClick={() => setUploadType("Leaf")}
        >
          Leaf
        </button>
      </div>
      <div className="content">
        {/* Upload Form */}
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="image-upload">
            <label htmlFor="file-input">Upload {uploadType} Image</label>
            <input id="file-input" type="file" accept="image/*" onChange={onFileChange} />
            {imagePreview && <img src={imagePreview} alt="Selected" className="preview-image" />}
          </div>

          <div className="buttons">
            <button type="button" onClick={clear}>Clear</button>
            <button type="button" onClick={onFileUpload} disabled={loading}>
              {loading ? "Uploading..." : "Upload!"}
            </button>
          </div>

          {error && <p style={{ color: "red" }}>{error}</p>}

          {plantInfo && (
            <div className="plant-info">
              <div className="form-group">
                <label>Name of Plant</label>
                <textarea value={plantInfo?.Name || "No Data Available"} readOnly />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea value={plantInfo?.Description || "No Description Available"} readOnly />
              </div>
              <div className="form-group">
                <label>Location Found</label>
                <textarea value={plantInfo?.Location || "No Location Available"} readOnly />
              </div>
              <div className="form-group">
                <label>Medical Usage</label>
                <textarea value={plantInfo?.Medical_Usage || "No Medical Usage Available"} readOnly />
              </div>
              <div className="form-group">
                <label>More Info</label>
                {plantInfo?.Know_More ? (
                  <a href={plantInfo.Know_More} target="_blank" rel="noopener noreferrer">
                    {plantInfo.Know_More}
                  </a>
                ) : <p>No Know More Available</p>}
              </div>

              <div className="form-group">
                <label>Votes</label>
                <p>👍 {votes.upvotes} | 👎 {votes.downvotes}</p>
                <button onClick={() => sendVote("upvote")} className="vote-btn">Upvote 👍</button>
                <button onClick={() => sendVote("downvote")} className="vote-btn">Downvote 👎</button>
              </div>
            </div>
          )}
        </form>

        {/* Chatbot Section */}
        <div className="chatbot">
          <h3>Hey Guys !! I am your Assistant Ask me anything about medicinal Plants 🧠</h3>
          <div className="chat-box">
            {chatMessages.map((msg, i) => (
              <div
                key={i}
                className={
                  msg.from === "user"
                    ? "chat-user"
                    : msg.from === "suggestion"
                      ? "chat-suggestion"
                      : "chat-bot"
                }
              >
                <p onClick={() => msg.from === "suggestion" && sendChat(msg.text)}>
                  {msg.text}
                </p>
              </div>
            ))}
            {chatLoading && <p className="chat-bot">Assistant is typing...</p>}
          </div>

          <div className="chat-input">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendChat()}
              placeholder="Ask me something..."
            />
            <button onClick={() => sendChat()} disabled={chatLoading || !chatInput.trim()}>
              {chatLoading ? "Thinking..." : "Send"}
            </button>
            <button onClick={listening ? stopListening : startListening}>
              {listening ? "Stop 🎙" : "Speak 🎤"}
            </button>
            <button onClick={clearChat}>Clear Chat 🧹</button>
          </div>
        </div>
        <div className="history-section">
          <h3>🕘 Recognition History</h3>
          <button className="clear-btn" onClick={clearHistory}>Clear History</button>
          {Array.isArray(history) && history.length > 0 ? (
            history.map((plant, index) => (
              <div key={index} className="plant-card">
                <h5>{plant.Name}</h5>
                <p><strong>Description:</strong> {plant.Description}</p>
                <p><strong>Location:</strong> {plant.Location}</p>
                <p><strong>Usage:</strong> {plant.Medical_Usage}</p>
                {plant.Know_More && (
                  <p><a href={plant.Know_More} target="_blank" rel="noopener noreferrer">Know More</a></p>
                )}
              </div>
            ))
          ) : (
            <p>No recognition history available.</p>
          )}
        </div>


        {/* Search and Filter Section */}
        <div className="search-filter-section">
          <h3>🔍 Search and Filter Plants</h3>
          <input
            type="text"
            placeholder="Search by plant name..."
            className="filter-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="filter-input"
            value={usageFilter}
            onChange={(e) => setUsageFilter(e.target.value)}
          >
            <option value="">Filter by medical usage</option>
            <option value="cold">Cold</option>
            <option value="fever">Fever</option>
            <option value="skin">Skin</option>
            <option value="digestive">Digestive</option>
          </select>

          {filteredPlants.length > 0 && (
            <div className="filtered-results">
              <h4>Matching Plants:</h4>
              {filteredPlants.map((plant, i) => (
                <div key={i} className="plant-card">
                  <h5>{plant.Name}</h5>
                  <p><strong>Usage:</strong> {plant.Medical_Usage}</p>
                  <p><strong>Description:</strong> {plant.Description}</p>
                </div>
              ))}
            </div>
          )}
        </div>


      </div>
    </div>
  );
}

export default Home;
