import { useRef, useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";

import TitleHeader from "../components/TitleHeader";
import Developer from "../components/models/Contact/Developer";
import CanvasLoader from "../components/CanvasLoader"; // If you have a loader component

const Contact = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });

  const [animationName, setAnimationName] = useState("idle");
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    const formData = new FormData(formRef.current);

    try {
      const response = await fetch("https://formsubmit.co/aswinnadh9803@gmail.com", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setSuccess(true);
        setForm({ name: "", email: "", message: "" });
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      alert("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="flex-center section-padding">
      <div className="w-full h-full md:px-10 px-5">
        <TitleHeader
          title="Get in Touch – Let’s Connect"
          sub="💬 Have questions or ideas? Let’s talk! 🚀"
        />

        <div className="grid-12-cols mt-16">
          {/* 3D Model Canvas */}
          <div className={`xl:col-span-7 min-h-96 ${
                isMobile || isTablet ? "pointer-events-none" : "hover:cursor-grab"
              }`}>
            <div
              onClick={() => setAnimationName("clapping")}
              onPointerOver={() => setAnimationName("salute")}
              onPointerOut={() => setAnimationName("idle")}
              className={`bg-zinc-900 w-full h-full rounded-3xl overflow-hidden ${
                isMobile || isTablet ? "scroll-pass-through" : "hover:cursor-grab"
              }`}
              
              
            >
              <Canvas >
                <ambientLight intensity={1} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                <directionalLight position={[10, 10, 10]} intensity={1} />

                <OrbitControls
                  enableZoom={false}
                  enableRotate={!(isMobile || isTablet)}
                  enablePan={false}
                />

                <Suspense fallback={<CanvasLoader />}>
                  <Developer
                    position-y={-3}
                    scale={3}
                    animationName={animationName}
                  />
                </Suspense>
              </Canvas>
            </div>
          </div>

          {/* Contact Form */}
          <div className="xl:col-span-5">
            <div className="flex-center card-border rounded-xl p-10">
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="w-full flex flex-col gap-7"
              >
                <div
                  onClick={() => setAnimationName("victory")}
                  onPointerOver={() => setAnimationName("victory")}
                  onPointerOut={() => setAnimationName("idle")}
                  className={`${isMobile || isTablet ? "pointer-events-none" : "hover:cursor-grab"}`}
                >
                  <label htmlFor="name">Your name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="What’s your good name?"
                    required
                  />
                </div>

                <div
                className={`${isMobile || isTablet ? "pointer-events-none" : "hover:cursor-grab"}`}
                  onClick={() => setAnimationName("clapping")}
                  onPointerOver={() => setAnimationName("clapping")}
                  onPointerOut={() => setAnimationName("idle")}
                >
                  <label htmlFor="email">Your Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="What’s your email address?"
                    required
                  />
                </div>

                <div
                className={`${isMobile || isTablet ? "pointer-events-none" : "hover:cursor-grab"}`}
                  onClick={() => setAnimationName("salute")}
                  onPointerOver={() => setAnimationName("salute")}
                  onPointerOut={() => setAnimationName("idle")}
                >
                  <label htmlFor="message">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="How can I help you?"
                    rows="5"
                    required
                  />
                </div>

                <button 
                className={`${isMobile || isTablet ? "pointer-events-none" : "hover:cursor-grab"}`}
                  onPointerOver={() => setAnimationName("victory")}
                  onPointerOut={() => setAnimationName("idle")}
                  type="submit"
                >
                  <div className="cta-button group">
                    <div className="bg-circle" />
                    <p className="text">
                      {loading ? "Sending..." : "Send Message"}
                    </p>
                    <div className="arrow-wrapper">
                      <img src="/images/arrow-down.svg" alt="arrow" />
                    </div>
                  </div>
                </button>

                {success && (
                  <p className="text-green-400 text-sm mt-4 text-center">
                    ✅ Email sent successfully!
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
