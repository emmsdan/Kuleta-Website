"use client";

import React, { useState } from "react";

function isYouTubeUrl(url?: string) {
  if (!url) return false;
  return /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)/.test(url);
}

function getYouTubeEmbedUrl(url: string) {
  // Handles various YouTube URL formats
  const regExp = /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/;
  const match = url.match(regExp);
  if (match && match[1]) {
    return `https://www.youtube.com/embed/${match[1]}?autoplay=1`;
  }
  return url;
}

export default function KuzaDadaVideoButton({ videoUrl, heroImage }: { videoUrl?: string; heroImage?: string }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    if (videoUrl) setOpen(true);
  };

  const handleClose = () => setOpen(false);

  return (
    <>
      <button
        type="button"
        onClick={handleOpen}
        className="relative h-[400px] bg-gradient-to-br from-green-100 to-yellow-100 rounded-2xl overflow-hidden group cursor-pointer w-full text-left"
        aria-label="Play Kuza Dada video"
      >
        <img src={heroImage || ""} alt="Kuza Dada" className="w-full h-full object-cover" />
        {videoUrl && (
          <div className="absolute inset-0 bg-gradient-to-r from-[#177F00]/30 to-[#E99C00]/30 flex items-center justify-center group-hover:from-[#177F00]/40 group-hover:to-[#E99C00]/40 transition-colors">
            <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
              {/* @ts-ignore */}
              <svg className="h-10 w-10 text-[#177F00] ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
            </div>
          </div>
        )}
      </button>

      {open && videoUrl && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={handleClose}
        >
          <div
            className="relative bg-black rounded-lg shadow-lg max-w-full max-h-full w-[90vw] h-[60vw] md:w-[800px] md:h-[450px] flex items-center justify-center"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={handleClose}
              className="absolute top-2 right-2 z-10 bg-white/80 hover:bg-white rounded-full p-2"
              aria-label="Close video modal"
            >
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
            {isYouTubeUrl(videoUrl) ? (
              <iframe
                src={getYouTubeEmbedUrl(videoUrl)}
                title="YouTube video player"
                allow="autoplay; encrypted-media"
                allowFullScreen
                className="w-full h-full rounded-lg border-0"
              />
            ) : (
              <video
                src={videoUrl}
                controls
                autoPlay
                className="w-full h-full rounded-lg bg-black"
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}
