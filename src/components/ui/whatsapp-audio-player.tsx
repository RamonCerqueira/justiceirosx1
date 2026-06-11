import React, { useState, useRef, useEffect } from "react";
import { Play, Pause } from "lucide-react";

interface WhatsAppAudioPlayerProps {
  audioUrl?: string;
  textTranscript?: string;
  senderName?: string;
  avatarUrl?: string;
}

export function WhatsAppAudioPlayer({ audioUrl, textTranscript, senderName = "Suporte", avatarUrl }: WhatsAppAudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<any>(null);

  // Estimate duration of speech transcription: ~130 words per minute
  useEffect(() => {
    if (textTranscript) {
      const words = textTranscript.trim().split(/\s+/).length;
      // standard reading speed yields ~2.1 words per second
      const estimatedSecs = Math.max(3, Math.round(words / 2.2));
      setDuration(estimatedSecs);
    }
  }, [textTranscript]);

  useEffect(() => {
    // If we are playing real audio url
    if (audioUrl) {
      const audio = audioRef.current;
      if (!audio) return;

      const onTimeUpdate = () => {
        setCurrentTime(audio.currentTime);
      };

      const onLoadedMetadata = () => {
        setDuration(audio.duration || 0);
      };

      const onEnded = () => {
        setIsPlaying(false);
        setCurrentTime(0);
      };

      audio.addEventListener("timeupdate", onTimeUpdate);
      audio.addEventListener("loadedmetadata", onLoadedMetadata);
      audio.addEventListener("ended", onEnded);

      return () => {
        audio.removeEventListener("timeupdate", onTimeUpdate);
        audio.removeEventListener("loadedmetadata", onLoadedMetadata);
        audio.removeEventListener("ended", onEnded);
      };
    }
  }, [audioUrl]);

  // Handle cleanup of speech on unmount
  useEffect(() => {
    return () => {
      if (textTranscript && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [textTranscript]);

  const togglePlay = () => {
    if (textTranscript) {
      if (isPlaying) {
        if (window.speechSynthesis) {
          window.speechSynthesis.cancel();
        }
        setIsPlaying(false);
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
      } else {
        if (!window.speechSynthesis) {
          alert("Seu navegador não suporta síntese de voz.");
          return;
        }

        window.speechSynthesis.cancel(); // Reset any active speech
        const utterance = new SpeechSynthesisUtterance(textTranscript);
        utterance.lang = "pt-BR";
        utterance.rate = playbackRate;

        utterance.onend = () => {
          setIsPlaying(false);
          setCurrentTime(0);
          if (timerRef.current) {
            clearInterval(timerRef.current);
          }
        };

        utterance.onerror = () => {
          setIsPlaying(false);
          setCurrentTime(0);
          if (timerRef.current) {
            clearInterval(timerRef.current);
          }
        };

        window.speechSynthesis.speak(utterance);
        setIsPlaying(true);
        
        // Progress counter simulation
        const intervalTime = 100; // 100ms
        timerRef.current = setInterval(() => {
          setCurrentTime((prev) => {
            const step = (intervalTime / 1000) * playbackRate;
            const next = prev + step;
            if (next >= duration) {
              clearInterval(timerRef.current);
              return duration;
            }
            return next;
          });
        }, intervalTime);
      }
    } else {
      const audio = audioRef.current;
      if (!audio) return;

      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        audio.play().catch((e) => console.error("Audio playback error:", e));
        setIsPlaying(true);
      }
    }
  };

  const changeSpeed = () => {
    let nextRate = 1;
    if (playbackRate === 1) nextRate = 1.5;
    else if (playbackRate === 1.5) nextRate = 2;
    else nextRate = 1;

    setPlaybackRate(nextRate);

    if (textTranscript) {
      // If currently speaking, we must restart it with the new rate
      if (isPlaying && window.speechSynthesis) {
        window.speechSynthesis.cancel();
        if (timerRef.current) clearInterval(timerRef.current);
        
        // Start again from offset
        const remainingText = textTranscript.split(" ").slice(Math.floor((currentTime / duration) * textTranscript.split(" ").length)).join(" ");
        if (remainingText.trim()) {
          const utterance = new SpeechSynthesisUtterance(remainingText);
          utterance.lang = "pt-BR";
          utterance.rate = nextRate;
          utterance.onend = () => {
            setIsPlaying(false);
            setCurrentTime(0);
          };
          window.speechSynthesis.speak(utterance);
          
          const intervalTime = 100;
          timerRef.current = setInterval(() => {
            setCurrentTime((prev) => {
              const step = (intervalTime / 1000) * nextRate;
              const next = prev + step;
              if (next >= duration) {
                clearInterval(timerRef.current);
                return duration;
              }
              return next;
            });
          }, intervalTime);
        }
      }
    } else {
      const audio = audioRef.current;
      if (audio) {
        audio.playbackRate = nextRate;
      }
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const newTime = (clickX / width) * duration;

    setCurrentTime(newTime);

    if (audioUrl && audioRef.current) {
      audioRef.current.currentTime = newTime;
    } else if (textTranscript && isPlaying && window.speechSynthesis) {
      // Seek support in TTS: cancel and speak remaining text
      window.speechSynthesis.cancel();
      if (timerRef.current) clearInterval(timerRef.current);

      const words = textTranscript.split(" ");
      const wordIndex = Math.floor((newTime / duration) * words.length);
      const remainingText = words.slice(wordIndex).join(" ");
      
      if (remainingText.trim()) {
        const utterance = new SpeechSynthesisUtterance(remainingText);
        utterance.lang = "pt-BR";
        utterance.rate = playbackRate;
        utterance.onend = () => {
          setIsPlaying(false);
          setCurrentTime(0);
        };
        window.speechSynthesis.speak(utterance);

        const intervalTime = 100;
        timerRef.current = setInterval(() => {
          setCurrentTime((prev) => {
            const step = (intervalTime / 1000) * playbackRate;
            const next = prev + step;
            if (next >= duration) {
              clearInterval(timerRef.current);
              return duration;
            }
            return next;
          });
        }, intervalTime);
      }
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  // Wave heights
  const waveHeights = [
    12, 18, 8, 15, 24, 10, 14, 20, 16, 28, 
    12, 22, 14, 18, 10, 24, 16, 20, 12, 26, 
    14, 18, 10, 22, 16, 28, 12, 18, 8, 20
  ];

  return (
    <div className="bg-[#075e54]/10 border border-[#00A884]/20 p-3 rounded-2xl flex items-center gap-3 max-w-sm w-full relative group hover:bg-[#075e54]/15 transition-all text-left">
      {audioUrl && <audio ref={audioRef} src={audioUrl} />}

      {/* Profile Pic with Microphone Badge */}
      <div className="relative shrink-0 select-none">
        {avatarUrl ? (
          <img src={avatarUrl} alt={senderName} className="w-10 h-10 rounded-full border border-white/10 object-cover" />
        ) : (
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-[#00A884] font-bold border border-white/10 uppercase text-xs">
            {senderName.slice(0, 2)}
          </div>
        )}
        <div className="absolute -bottom-1 -right-1 bg-[#00A884] text-white w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#050914] shadow-md scale-90">
          <svg viewBox="0 0 24 24" width="10" height="10" fill="currentColor">
            <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"/>
          </svg>
        </div>
      </div>

      {/* Main body */}
      <div className="flex-1 flex flex-col gap-1 overflow-hidden">
        <div className="flex items-center gap-2">
          {/* Play/Pause Button */}
          <button 
            type="button"
            onClick={togglePlay} 
            className="w-7 h-7 rounded-full bg-transparent border-0 flex items-center justify-center text-[#00A884] hover:scale-105 active:scale-95 transition-all cursor-pointer shrink-0"
          >
            {isPlaying ? <Pause className="w-4.5 h-4.5 fill-current" /> : <Play className="w-4.5 h-4.5 fill-current ml-0.5" />}
          </button>

          {/* Waveform */}
          <div 
            onClick={handleSeek} 
            className="flex-1 h-7 flex items-center gap-[2px] cursor-pointer relative"
          >
            {waveHeights.map((height, idx) => {
              const barProgress = (idx / waveHeights.length) * 100;
              const isFilled = progressPercent >= barProgress;
              return (
                <div 
                  key={idx}
                  className="w-[2.5px] rounded-full transition-colors duration-150"
                  style={{
                    height: `${height * 0.7}px`,
                    backgroundColor: isFilled ? "#53bdeb" : "rgba(255, 255, 255, 0.2)"
                  }}
                />
              );
            })}
          </div>
        </div>

        {/* Timing and Speed Controls */}
        <div className="flex items-center justify-between pl-9 text-[9px] text-gray-400 font-semibold select-none">
          <span>{formatTime(currentTime)} / {formatTime(duration)}</span>
          <button 
            type="button"
            onClick={changeSpeed} 
            className="px-1.5 py-0.5 rounded-md bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white transition-all font-bold cursor-pointer text-gray-300"
          >
            {playbackRate}x
          </button>
        </div>
      </div>
    </div>
  );
}
