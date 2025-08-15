// App.jsx
import { useState } from 'react';
import { Copy } from 'lucide-react';
import axios from 'axios'; // ✅ Correct position

export default function App() {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [copied, setCopied] = useState(false);

  const handleShorten = async () => {
    if (!longUrl.startsWith('http')) {
      alert('Enter a valid URL');
      return;
    }

    try {
      const res = await axios.get(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(longUrl)}`);
      setShortUrl(res.data);
      setCopied(false);
    } catch (error) {
      alert("Failed to shorten URL");
      console.error(error);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">
      <h1 className="text-3xl font-bold mb-6">🔗 URL Shortener</h1>
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
        <input
          type="text"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          placeholder="Enter long URL"
          className="w-full border px-4 py-2 rounded-md mb-4"
        />
        <button
          onClick={handleShorten}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Shorten
        </button>

        {shortUrl && (
          <div className="mt-4 flex items-center justify-between bg-gray-100 px-4 py-2 rounded-md">
            <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
              {shortUrl}
            </a>
            <button onClick={handleCopy}>
              <Copy size={18} />
            </button>
          </div>
        )}
        {copied && <p className="text-green-600 mt-2 text-sm">Copied to clipboard!</p>}
      </div>
    </div>
  );
}


// import React, { useState } from "react";
// import { Copy } from "lucide-react";

// function App() {
//   const [url, setUrl] = useState("");
//   const [shortUrl, setShortUrl] = useState("");

//   const handleShorten = () => {
//     if (url.trim() === "") return;
//     // Fake shortener logic for demo
//     setShortUrl("https://short.ly/" + Math.random().toString(36).substr(2, 6));
//   };

//   const handleCopy = () => {
//     navigator.clipboard.writeText(shortUrl);
//     alert("Copied to clipboard!");
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-50 flex items-center justify-center px-4">
//       <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
//         <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
//           🔗 URL Shortener
//         </h1>

//         {/* Input + Button */}
//         <div className="flex gap-2 mb-4">
//           <input
//             type="text"
//             value={url}
//             onChange={(e) => setUrl(e.target.value)}
//             placeholder="Paste your long URL here..."
//             className="flex-1 px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
//           />
//           <button
//             onClick={handleShorten}
//             className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
//           >
//             Shorten
//           </button>
//         </div>

//         {/* Shortened URL */}
//         {shortUrl && (
//           <div className="flex items-center justify-between bg-blue-50 border rounded-xl px-4 py-3">
//             <a
//               href={shortUrl}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-blue-600 font-medium truncate"
//             >
//               {shortUrl}
//             </a>
//             <button
//               onClick={handleCopy}
//               className="ml-2 p-2 rounded-lg hover:bg-blue-100"
//             >
//               <Copy size={18} />
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default App;
