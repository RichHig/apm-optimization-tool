// frontend/src/pages/HomePage.js
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CreditCard, BarChart2, ShieldCheck } from "lucide-react";

function HomePage() {
  return (
    <div
      className="d-flex flex-column min-vh-100"
      style={{ background: "linear-gradient(to bottom, #F9FAFB, #F3F4F6)" }}
    >
      {/* Hero Section */}
      <section
        className="position-relative overflow-hidden text-white"
        style={{
          background: "linear-gradient(to right, #2563EB, #6366F1)",
          padding: "6rem 0",
        }}
      >
        {/* Overlay */}
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{ backgroundColor: "black", opacity: 0.5 }}
        ></div>
        <div
          className="container text-center position-relative"
          style={{ zIndex: 1, padding: "0 1.5rem" }}
        >
          <h1 className="display-3 fw-bold mb-3">
            Optimize Your Payment Methods with AI
          </h1>
          <p className="lead mb-4 mx-auto" style={{ maxWidth: "48rem" }}>
            Reduce fees, increase transaction success, and detect fraud in
            real-time.
          </p>
          <Link
            to="/dashboard"
            className="btn btn-light btn-lg rounded-pill fw-semibold d-inline-flex align-items-center"
          >
            View Dashboard
            <span className="ms-2">
              <ArrowRight />
            </span>
          </Link>
        </div>
        <div
          className="position-absolute bottom-0 start-0 end-0"
          style={{
            height: "4rem",
            background: "linear-gradient(to bottom, transparent, #F9FAFB)",
          }}
        ></div>
      </section>

      {/* Features Section */}
      <section className="py-5">
        <div className="container">
          <h2 className="display-5 fw-bold text-center mb-4 text-dark">
            Key Features
          </h2>
          <div className="row row-cols-1 row-cols-md-3 g-4">
            <FeatureCard
              icon={
                <CreditCard
                  className="mb-2"
                  style={{ width: "3rem", height: "3rem", color: "#2563EB" }}
                />
              }
              title="APM Recommendations"
              description="Get AI-driven recommendations on the best payment methods for your business."
            />
            <FeatureCard
              icon={
                <BarChart2
                  className="mb-2"
                  style={{ width: "3rem", height: "3rem", color: "#10B981" }}
                />
              }
              title="Fee Optimization"
              description="Compare fees across multiple providers and optimize your transaction costs."
            />
            <FeatureCard
              icon={
                <ShieldCheck
                  className="mb-2"
                  style={{ width: "3rem", height: "3rem", color: "#EF4444" }}
                />
              }
              title="Fraud Detection"
              description="Identify fraudulent transactions quickly and reduce risk using advanced ML."
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div
      className="card h-100 border-0 shadow-sm"
      style={{ transition: "all 0.3s" }}
    >
      <div className="card-body text-center">
        <div className="mb-3">{icon}</div>
        <h5 className="card-title fw-bold text-dark">{title}</h5>
        <p className="card-text text-muted">{description}</p>
      </div>
    </div>
  );
}

export default HomePage;
