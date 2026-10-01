import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const content = [
  ".content__navigation",
  ".content__sections",
];

const revealcontent = () => {
  gsap.from(content, {
    opacity: 0,
    duration: 0.9,
    ease: "power3.out",
    stagger: 0.12,

    scrollTrigger: {
      trigger: ".content__section.is-active",
      start: "top 70%",
      toggleActions: "play none none reverse",
    },
  });
};

export const initProjectProcess = () => {
  revealcontent();
};
