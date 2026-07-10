import React, { useEffect, useState } from "react";
import OriginalRoot from "@theme-original/Root";
import type RootType from "@theme/Root";
import type { WrapperProps } from "@docusaurus/types";

function BackToTop(): JSX.Element {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      style={{
        position: "fixed",
        bottom: "2rem",
        right: "2rem",
        width: "44px",
        height: "44px",
        borderRadius: "50%",
        background: "var(--ifm-color-primary)",
        color: "#fff",
        border: "none",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "1.2rem",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.3s, transform 0.3s",
        zIndex: 1000,
        boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      ↑
    </button>
  );
}

type Props = WrapperProps<typeof RootType>;

export default function RootWrapper({ children }: Props): JSX.Element {
  return (
    <>
      <OriginalRoot>{children}</OriginalRoot>
      <BackToTop />
    </>
  );
}
