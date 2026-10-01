import gsap from "gsap";

export const initHeroAnimations = () => {
  const hero = document.querySelector(".homepage__hero") as HTMLElement;
  const mobileTitle = document.querySelector(".hhero__title--special");

  if (!hero || !mobileTitle) return;

  gsap.set(hero, {
    perspective: 1000,
  });

  const tl = gsap.timeline({ defaults: { ease: "back.out(1.4)" } });

  tl.from(".hhero__title", {
    z: -400,
    rotationX: 20,
    opacity: 0,
    filter: "blur(6px)",
    duration: 1.1,
    stagger: 0.18,
  })
    .from(
      ".homepage__hero--image",
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
      [".hhero__description", ".button"],
      {
        y: 20,
        opacity: 0,
        stagger: 0.15,
        duration: 0.6,
        ease: "power2.out",
      },
      "-=0.6"
    );



  // developer / designer words

  if (window.innerWidth < 1080) {
    const words = ["eveloper", "esigner"];
    let currentWord = 0;

    const word = document.createElement("span");
    word.textContent = words[0];
    mobileTitle.textContent = "D";
    mobileTitle.appendChild(word);

    const runTypingLoop = async () => {
      while (true) {
        await new Promise((resolve) => setTimeout(resolve, 2000));

        const currentText = words[currentWord];
        currentWord = (currentWord + 1) % words.length;
        const targetText = words[currentWord];

        for (let i = currentText.length; i >= 0; i--) {
          word.textContent = currentText.substring(0, i);
          await new Promise((resolve) =>
            setTimeout(resolve, 30 + Math.random() * 30)
          );
        }

        await new Promise((resolve) => setTimeout(resolve, 100));

        for (let i = 1; i <= targetText.length; i++) {
          word.textContent = targetText.substring(0, i);
          await new Promise((resolve) =>
            setTimeout(resolve, 55 + Math.random() * 80)
          );
        }
      }
    };

    runTypingLoop();
  }


  /* image */

  const image = hero.querySelector(
    ".homepage__hero--image"
  ) as HTMLElement | null;

  if (!image) return;


  /* button */
  const button = document.querySelector(".button__email--hero");
  const svgArrow = button?.querySelector("svg");

  if (button && svgArrow) {
    button.addEventListener("mousemove", (e: Event) => {
      const mouseEvent = e as MouseEvent;
      const rect = button.getBoundingClientRect();
      const x = mouseEvent.clientX - (rect.left + rect.width / 2);
      const y = mouseEvent.clientY - (rect.top + rect.height / 2);

      gsap.to(button, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(svgArrow, { x: 6, duration: 0.2 });
    });

    button.addEventListener("mouseleave", () => {
      gsap.to(button, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.4)" });
      gsap.to(svgArrow, { x: 0, duration: 0.3 });
    });
  }
}