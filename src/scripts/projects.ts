// projects.ts
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initProjectsReveal() {
  gsap.fromTo(".projects__section > *",
    {
      opacity: 0,
      y: 50
    },
    {
      opacity: 1,
      y: 0,
      stagger: 0.12,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".projects__section > *",
        start: "top 80%", 
        end: "top 30%",
        scrub: true,
        markers: true   
      }
    }
  );

  

}

export function initCardHoverParallax() {
  const cards = document.querySelectorAll<HTMLElement>(".project__card");

  cards.forEach((card) => {
    const tags = card.querySelectorAll<HTMLElement>(".card__labels li");
    const img = card.querySelector<HTMLElement>(".card__image--img");

    card.addEventListener("mouseenter", () => {
      cards.forEach((otherCard) => {
        if (otherCard !== card) {
          gsap.to(otherCard, {
            opacity: 0.9,
            filter: "brightness(0.7)",
            duration: 0.3,
            ease: "power2.out",
          });
        }
      });

      gsap.to(tags, {
        y: -3,
        scale: 1,
        stagger: {
          each: 0.04,
          from: "center",
        },
        duration: 0.3,
        ease: "back.out(1.7)",
      });

      gsap.to(img, { scale: 1.06, duration: 0.4, ease: "power2.out" });
    });

    card.addEventListener("mouseleave", () => {
      cards.forEach((otherCard) => {
        gsap.to(otherCard, {
          opacity: 1,
          filter: "brightness(1)",
          duration: 0.3,
          ease: "power2.out",
        });
      });

      gsap.to(tags, {
        y: 0,
        scale: 1,
        stagger: 0.02,
        duration: 0.2,
        ease: "power2.inOut",
      });

      gsap.to(img, { scale: 1, duration: 0.4, ease: "power2.out" });
    });
  });
}