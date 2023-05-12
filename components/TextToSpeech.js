import React from 'react';

const TextToSpeech = () => {
  return (
    <div>
      <form>
        <input
          className="bg-transparent w-[510px] border border-[#ff4747]/80 outline-none rounded-lg placeholder:text-[#ff4747]
           p-2 text-[#ff4747]/80"
          type="text"
          placeholder="Ask me anything"
        />
        <button>Ask</button>
      </form>
    </div>
  );
};

export default TextToSpeech;
