import { useState, useCallback } from "react";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import { focusNotes } from "../data/focusNotes";

export default function FocusNotesCarousel() {
  const [activeSlide, setActiveSlide] = useState(0);
  const totalSlides = focusNotes.length;

  const goToPrev = useCallback(() => {
    setActiveSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  }, [totalSlides]);

  const goToNext = useCallback(() => {
    setActiveSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  }, [totalSlides]);

  const goToSlide = useCallback((index: number) => {
    setActiveSlide(index);
  }, []);

  const currentNote = focusNotes[activeSlide];

  return (
    <section className="carousel-banner" aria-label="Focus Notes carousel">
      <div
        className="carousel-content-wrapper"
        role="region"
        aria-roledescription="carousel"
        aria-label="Focus Notes tips"
      >
        <div
          className="carousel-text-area"
          role="group"
          aria-roledescription="slide"
          aria-label={`Slide ${activeSlide + 1} of ${totalSlides}`}
        >
          <div className="carousel-tag-row">
            <span className="carousel-pill-tag">Focus Notes</span>
            <span className="carousel-step-counter" aria-hidden="true">
              {currentNote.step}
            </span>
          </div>

          <h2 className="carousel-headline">{currentNote.title}</h2>
          <p className="carousel-subtext">{currentNote.description}</p>

          <div
            className="carousel-indicators"
            role="tablist"
            aria-label="Focus notes slide pagination"
          >
            {focusNotes.map((_, index) => (
              <button
                key={index}
                type="button"
                className={`carousel-dot ${index === activeSlide ? "active" : ""}`}
                onClick={() => goToSlide(index)}
                role="tab"
                aria-selected={index === activeSlide}
                aria-label={`Go to slide ${index + 1}: ${focusNotes[index].title}`}
              />
            ))}
          </div>
        </div>

        <div className="carousel-action-area">
          {/* Floating interactive task preview card */}
          <div className="carousel-floating-card" aria-hidden="true">
            <div className="floating-card-header">
              <div
                className={`floating-card-icon ${
                  currentNote.cardCompleted ? "completed" : ""
                }`}
              >
                {currentNote.cardCompleted && <Check size={12} strokeWidth={3} />}
              </div>
              <span className="floating-card-title">{currentNote.cardTitle}</span>
            </div>
            <div className="floating-card-progress-bar">
              <div
                className="floating-card-progress-fill"
                style={{ width: `${currentNote.cardProgress}%` }}
              />
            </div>
            <div className="floating-card-meta">
              <span>{currentNote.cardProgress}%</span>
            </div>
          </div>

          {/* Navigation controls */}
          <div className="carousel-nav-arrows">
            <button
              type="button"
              className="carousel-arrow-btn"
              onClick={goToPrev}
              aria-label="Previous focus note"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              className="carousel-arrow-btn"
              onClick={goToNext}
              aria-label="Next focus note"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
