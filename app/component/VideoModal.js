// components/VideoModal.js
"use client";
import { useState } from "react";
import ModalVideo from "react-modal-video";
import "react-modal-video/scss/modal-video.scss";

export default function VideoModal({ videoId, children }) {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <ModalVideo
        channel="youtube"
        isOpen={isOpen}
        videoId={videoId}
        onClose={() => setOpen(false)}
      />
      <span onClick={() => setOpen(true)} className="cursor-pointer">
        {children}
      </span>
    </>
  );
}
