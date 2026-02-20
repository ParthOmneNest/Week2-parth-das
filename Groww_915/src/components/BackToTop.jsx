import { useScrollPosition } from "../hooks/useScrollPosition";

export const BackToTop = () => {
  const scrollPosition = useScrollPosition();

  if (scrollPosition <= 300) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        padding: "10px",
        cursor: "pointer",
      }}
    >
      ↑ Back to Top
    </button>
  );
};