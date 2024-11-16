export function fireConfetti() {
  try {
    const count = 100

    const defaults = {
      origin: { y: 0.7 },
    }

    function fire(particleRatio: number, opts: any) {
      // @ts-ignore
      window.confetti({
        colors: ["#ff6800", "#9c6eff", "#3d2851", "#000000"],
        shapes: ["circle", "square", "square"],
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      })
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    })
    fire(0.2, {
      spread: 60,
    })
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    })
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    })
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    })
  } catch {}
}
