import React, { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import "./Gallery.css";

export default function Gallery() {
  const [slideIndex, setSlideIndex] = useState(0);
  const [selectedCard, setSelectedCard] = useState(null);
  const cardsRef = useRef(null);
  const intervalRef = useRef(null);

  const slides = [
    { id: 1, src: "/assets/image7.jpg", title: "Curated Originals", subtitle: "Discover art you love" },
    { id: 2, src: "/assets/image.png", title: "Emerging Artists", subtitle: "Support new voices" },
    { id: 3, src: "/assets/lll.jpg", title: "Museum Quality", subtitle: "Shop with confidence" },
  ];

  const categoryCards = [
    { id: "abstract", title: "Abstract", desc: "Bold forms & colors", img: "/assets/image1.jpg" },
    { id: "landscape", title: "Landscapes", desc: "Nature & vistas", img: "/assets/image3.jpg" },
    { id: "portrait", title: "Portraits", desc: "Faces & stories", img: "/assets/image5.jpg" },
    { id: "modern", title: "Modern", desc: "Contemporary vision", img: "/assets/image6.jpg" },
    
  ];

  const total = slides.length;

  const next = useCallback(() => setSlideIndex((prev) => (prev + 1) % total), [total]);
  const prev = useCallback(() => setSlideIndex((prev) => (prev - 1 + total) % total), [total]);
  const goTo = useCallback((idx) => setSlideIndex(((idx % total) + total) % total), [total]);

  useEffect(() => {
    intervalRef.current = setInterval(next, 4000);
    return () => clearInterval(intervalRef.current);
  }, [next]);

  // Scroll cards horizontally
  const scrollCards = (direction) => {
    if (cardsRef.current) {
      const scrollAmount = cardsRef.current.clientWidth; // scroll by visible width
      cardsRef.current.scrollBy({ left: direction === "next" ? scrollAmount : -scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="home-page">
      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-left">
          <Link to="/" className="logo">🎨 VirtuArt</Link>
        </div>
        <div className="nav-right">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/about" className="nav-link">About Us</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
          <Link to="/login" className="nav-link">Login</Link>
          <Link to="/register" className="nav-link">Register</Link>
        </div>
      </nav>

      
      {/* <header className="hero">
        <h1>Find your next favorite artwork</h1>
        <p>Original pieces from emerging and established artists worldwide</p>
      </header> */}

      {/* Carousel */}
      <section className="carousel">
        <div className="track" style={{ transform: `translateX(-${slideIndex * 100}%)` }}>
          {slides.map((s) => (
            <div className="slide" key={s.id}>
              <img src={s.src} alt={s.title} />
              <div className="caption">
                <h3>{s.title}</h3>
                <p>{s.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
        <button className="control prev" onClick={prev}>‹</button>
        <button className="control next" onClick={next}>›</button>
        <div className="dots">
          {slides.map((_, i) => (
            <button
              key={`dot-${i}`}
              className={`dot ${i === slideIndex ? "active" : ""}`}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      </section>

      {/* Category Cards */}
      <section className="cards">
        <button className="scroll-btn scroll-prev" onClick={() => scrollCards("prev")}>‹</button>
        <div className="cards-scroll" ref={cardsRef}>
          {categoryCards.map((c) => (
            <div key={c.id} className="card" onClick={() => setSelectedCard(c)}>
              <img src={c.img} alt={c.title} className="card-img" />
              <div className="card-body">
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <button className="scroll-btn scroll-next" onClick={() => scrollCards("next")}>›</button>
      </section>

      {/* Modal */}
      {selectedCard && (
        <div className="modal-overlay" onClick={() => setSelectedCard(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedCard(null)}>×</button>
            <h2>{selectedCard.title}</h2>
            <img src={selectedCard.img} alt={selectedCard.title} />
            <p>{selectedCard.desc}</p>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="footer" style={{ color: "#333", fontSize: "18px", fontWeight: "500", padding: "25px 20px", textAlign: "center" }}>
        <p>© {new Date().getFullYear()} Art Gallery. All rights reserved.</p>
      </footer>
    </div>
  );
}
