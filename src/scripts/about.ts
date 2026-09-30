import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const NO_REDUCED_MOTION = "(prefers-reduced-motion: no-preference)";

const mm = gsap.matchMedia();

const content = [
  ".about__title",
  ".screen",
  ".screen__info",
  ".button__about",
];

const revealcontent = (start = "top 60%") => {
  gsap.from(content, {
    y: 40,
    opacity: 0,
    duration: 0.9,
    ease: "power3.out",
    stagger: 0.12,
    scrollTrigger: {
      trigger: ".about",
      start,
      toggleActions: "play none none reverse",
    },
  });
}

const cardExpand = () => {
  mm.add(NO_REDUCED_MOTION, () => {
    gsap.fromTo(
      ".bottom",
      { clipPath: "inset(14vh 8vw 0vh 8vw round 2.5rem 2.5rem 0rem 0rem)" },
      {
        clipPath: "inset(0vh 0vw 0vh 0vw round 0rem 0rem 0rem 0rem)",
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".bottom",
          start: "top bottom",
          end: "top 10%",
          scrub: 0.6,
          markers: true
        },
      },
    );

    revealcontent("top 50%");
  });
}


const variants = {
  card: cardExpand,
} as const;

export type AboutVariant = keyof typeof variants;


const swapTargets = [
  ".screen__info--images",
  ".info__nl--location",
  ".screen__info--text",
  ".screen__info--liz"
];

export const initAbout = (variant: AboutVariant = "card") => {
  variants[variant]();

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const dist = reduceMotion ? 0 : 20;

  let mode: "on" | "off" = "on";
  const setMode = (next: "on" | "off") => {
    if (next === mode) return;
    mode = next;
    requestAnimationFrame(() => {
      document
        .querySelector<HTMLButtonElement>(
          next === "off" ? ".offscreen" : ".onscreen",
        )
        ?.click();
    });
  };

  const tl = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: {
      trigger: ".bottom",
      start: "62% bottom",
      end: "50% 40%",
      scrub: true,
      pin: ".about",
      pinSpacing: true,
      markers: true,
    },
  });

  tl
    .to(
      swapTargets,
      { y: -dist, opacity: 0, duration: 0.4, ease: "power2.in" },
      0,
    )
    .fromTo(
      swapTargets,
      { y: dist, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
        immediateRender: false, 
      },
      0.6,
    );

  tl.eventCallback("onUpdate", () =>
    setMode(tl.progress() >= 0.5 ? "off" : "on"),
  );

}
