import { useEffect, useRef } from "react";
import "./gradient.scss";

export default function Gradient() {
    const interactiveElementRef = useRef(null);
    const curX = useRef(0);
    const curY = useRef(0);
    const tgX = useRef(0);
    const tgY = useRef(0);
    const animationFrame = useRef(null);

    useEffect(() => {
        function move() {
            if (!interactiveElementRef.current) return;
            
            curX.current += (tgX.current - curX.current) / 20;
            curY.current += (tgY.current - curY.current) / 20;
            interactiveElementRef.current.style.transform = `translate(${Math.round(curX.current)}px, ${Math.round(curY.current)}px)`;

            animationFrame.current = requestAnimationFrame(move);
        }

        function onMouseMove(event) {
            tgX.current = event.clientX;
            tgY.current = event.clientY;
            if (!animationFrame.current) move(); // Start animation only if not running
        }

        window.addEventListener("mousemove", onMouseMove);

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
        };
    }, []);

    return (
    <div className="gradient-bg">
        <svg xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="goo">
              <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
              <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="goo" />
              <feBlend in="SourceGraphic" in2="goo" />
            </filter>

            <filter id="grainy">
                <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" result="noise"/>
            </filter>
          </defs>
        </svg>
        <div className="gradients-container">
          <div className="g1"></div>
          <div className="g2"></div>
          <div className="g3"></div>
          <div className="g4"></div>
          <div className="g5"></div>
          <div className="interactive" ref={interactiveElementRef}></div>
        </div>
      </div>
    );
}