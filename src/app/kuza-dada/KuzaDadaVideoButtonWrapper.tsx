"use client";
import dynamic from "next/dynamic";
import React from "react";
const KuzaDadaVideoButton = dynamic(() => import("./KuzaDadaVideoButton"), { ssr: false });

export default function KuzaDadaVideoButtonWrapper({ videoUrl, heroImage }: { videoUrl?: string; heroImage?: string }) {
  return <KuzaDadaVideoButton videoUrl={videoUrl} heroImage={heroImage} />;
}
