import React, { useRef, useEffect, useState, memo } from "react";
import ReactDOM from "react-dom";

const COLORS = ["#2ecc71", "#3498db", "#e67e22", "#e67e22", "#e74c3c"];
// const TOP_OFFSET = window.innerHeight;
const LEFT_OFFSET = 150;

const randomNumber = (min: number, max: number) =>
  min + Math.floor(Math.random() * (max - min));

const randomColor = () => COLORS[randomNumber(0, COLORS.length)];

const Particle = ({ children, size }: any) => {
  const ref = useRef<any>({});
  const child = React.Children.only(children);
  const top = randomNumber(-200, -size[1]);

  useEffect(() => {
    ref.current.style.setProperty(
      "--x",
      `${randomNumber(-LEFT_OFFSET, LEFT_OFFSET)}px`
    );
    ref.current.style.setProperty(
      "--y",
      `${window.innerHeight - top + randomNumber(0, 300)}px`
    );
    ref.current.style.setProperty("--rotate", `${randomNumber(200, 3000)}deg`);
  }, []);

  return React.cloneElement(child, {
    ref,
    style: {
      "--color": randomColor(),
      "--size": `${randomNumber(...size)}px`,
      "--rotate": "0deg",
      "--x": "0px",
      "--y": "0px",
      top: top,
      left: randomNumber(0, window.innerWidth),
    },
  });
};

const CircularParticle = () => (
  <Particle size={[5, 10]}>
    <div className="particle circular" />
  </Particle>
);

const RectangularParticle = () => (
  <Particle size={[5, 10]}>
    <div className="particle rectangular" />
  </Particle>
);

const SquiggleParticle = () => (
  <Particle size={[15, 45]}>
    <svg
      className="particle squiggle"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 30 200"
    >
      <path d="M15 0 Q 30 25 15 50 Q 0 75 15 100 Q 30 125 15 150 Q 0 175 15 200" />
    </svg>
  </Particle>
);

export const Particles = React.memo(({ count: n }: any) => {
  Particles.displayName = "Particles";
  const particles = [];
  const types = [SquiggleParticle, RectangularParticle, CircularParticle];

  while (n--) {
    const Particle = types[randomNumber(0, 3)];
    particles.push(<Particle key={n} />);
  }

  return <div className="particles">{particles}</div>;
});
