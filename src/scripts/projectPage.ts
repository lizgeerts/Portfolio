import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const initHeroProjects = () => {
  initHeroImageLoader();
  
  const projectHero = document.querySelector(".project__hero") as HTMLElement;

  gsap.set(projectHero, {
    perspective: 1000,
  });

  const tl = gsap.timeline({ defaults: { ease: "back.out(1.4)" } });

  tl.from(".phero__titdes > *", {
    z: -400,
    rotationX: 20,
    opacity: 0,
    filter: "blur(6px)",
    duration: 1.1,
    stagger: 0.18,
  })
    .from(
      ".project__hero--image",
      {
        scale: 0.6,
        rotationY: -20,
        opacity: 0,
        filter: "blur(6px)",
        duration: 1.3,
      },
      "-=0.9"
    )
    .from(
      [".phero__info", ".info__buttons"],
      {
        y: 20,
        opacity: 0,
        stagger: 0.15,
        duration: 0.6,
        ease: "power2.out",
      },
      "-=0.6"
    );
}

const initHeroImageLoader = () => {
  const img = document.querySelector<HTMLImageElement>(".hero-img");
  const loader = document.querySelector<HTMLElement>(".hero-loader");
  if (!img || !loader) return;

  const remove = () => loader.remove();

  // Already loaded (cached): the flower was never meant to be seen.
  if (img.complete) {
    remove();
    return;
  }

  const finish = () => {
    // decode first so the image doesn't pop in half-painted
    (img.decode ? img.decode().catch(() => { }) : Promise.resolve()).then(() => {
      loader.addEventListener("transitionend", remove, { once: true });
      loader.classList.add("is-done");
      setTimeout(remove, 600); // safety net if transitionend never fires
    });
  };

  img.addEventListener("load", finish, { once: true });
  img.addEventListener("error", finish, { once: true });
}