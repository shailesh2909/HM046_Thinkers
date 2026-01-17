import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Landing.css";

export default function Landing() {
  return (
    <>
      <Navbar />

      <main className="hero">
        <h1>Hire or Get Hired Easily</h1>
        <p>
          A smart freelancing platform connecting businesses and skilled
          professionals.
        </p>

        <button className="hero-btn">Get Started</button>
      </main>

      <Footer />
    </>
  );
}
