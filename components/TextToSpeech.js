'use client';
import { sendTextToOpenAi } from '../utils/sendTextToOpenAi';
import React, { useState } from 'react';

const TextToSpeech = () => {
  const [userText, setuserText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
  const voices = synth?.getVoices();
  // console.log(voices);

  const selectedVoices = voices?.find((voice) => voice.name === 'Albert');

  const speak = (text) => {
    if (synth && !isLoading) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = selectedVoices;
      utterance.rate = 0.2;
      synth.speak(utterance);
      setIsLoading(true);

      utterance.onend = () => {
        setIsLoading(false);
      };
    }
  };

  const handleUserText = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/openai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userText }),

        // console.log();
      });
      const { message } = await response.json();
      console.log(message);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(true);

    // try {
    //   const message = await sendTextToOpenAi(userText);
    //   speak(message);
    //   setIsLoading(true);
    // } catch (error) {
    //   let message = '';
    //   if (error.message === 'Failed to fetch') {
    //     message = 'Please check your internet connection';
    //   } else {
    //     message = error.message;
    //   }
    //   console.log(error.message);
    // } finally {
    //   setIsLoading(false);
    //   setuserText('');
    // }
  };
  return (
    <div className="relative top-0 z-50">
      <form
        onSubmit={handleUserText}
        className="space-x-2 pt-2 absolute top-[700px] left-[30px]"
      >
        <input
          value={userText}
          onChange={(e) => setuserText(e.target.value)}
          className="bg-transparent w-[510px] border border-[#ff4747]/80 outline-none rounded-lg placeholder:text-[#ff4747]
           p-2 text-[#ff4747]/80"
          type="text"
          placeholder="Ask me anything"
        />
        <button
          onClick={() => speak(userText)}
          disabled={isLoading}
          className="text-[#b00c3f] p-2 border border-[#b00c3f]
         rounded-lg disabled:text-blue-100 disabled:cursor-not-allowed disabled:bg-gray-500 hover:scale-100
          hover:text-black hover:bg-[#b00c3f] duration-300 transition-all"
        >
          {isLoading ? 'Thinking...' : 'Ask'}
        </button>
      </form>
    </div>
  );
};

export default TextToSpeech;
