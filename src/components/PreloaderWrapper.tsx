"use client";

import { useState } from "react";
import { Preloader } from "./Preloader";

interface PreloaderWrapperProps {
  children: React.ReactNode;
}

export function PreloaderWrapper({ children }: PreloaderWrapperProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      <Preloader onComplete={() => setIsLoaded(true)} />
      <div
        style={{
          opacity: isLoaded ? 1 : 0,
          transition: "opacity 0.5s ease-out",
          transitionDelay: isLoaded ? "0.3s" : "0s",
        }}
      >
        {children}
      </div>
    </>
  );
}
