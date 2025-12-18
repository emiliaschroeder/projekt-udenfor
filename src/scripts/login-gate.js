const STORAGE_KEY = "iform-totally-logged-in";
const PASSWORD = "gruppe4";

function createOverlay() {
  const overlay = document.createElement("div");
  overlay.id = "login-overlay";

  overlay.innerHTML = `
    <div
      class="fixed inset-0 z-[9999]
             flex items-center justify-center
             bg-black/5 backdrop-blur-[1px]
             p-4 opacity-0 transition-opacity duration-300"
    >
      <!-- Popup box -->
      <div
        class="relative
          w-full
          max-w-[285px] md:max-w-[500px]
          bg-primary
          border-4 md:border-8 border-secondary
          p-[var(--space-mob-xl)] md:p-[var(--space-desk-lg)]
          text-center
          flex flex-col
          gap-[var(--space-mob-xl)] md:gap-[var(--space-desk-lg)]"
      >
        <!-- Headline -->
        <section class="text-secondary leading-tight">
          <h3 class="font-sans-bold text-[28px] md:text-[36px]">
            Login
          </h3>
        </section>

        <!-- Text -->
        <p class="font-sans text-black text-[14px] md:text-[18px]">
          Dette er et eksamensprojekt på Digitalt Design lavet af Fie, Emilia & Sille<br />
          Koden er <span class="font-sans-bold">gruppe4</span>
        </p>

        <!-- Form -->
        <form class="flex flex-col gap-[var(--space-mob-md)]">
          <input
            type="password"
            name="pass"
            placeholder="Indtast kode"
            class="w-full border-2 border-secondary bg-primary px-3 py-2 outline-none"
          />

          <p class="hidden text-secondary font-sans text-[14px]" id="login-error">
            Forkert kode
          </p>

          <button
            type="submit"
            class="inline-flex justify-center items-center leading-none
                   px-7 py-2 md:px-16 md:py-3
                   bg-accent text-secondary
                   shadow-[var(--shadow-offset-sm)_var(--color-secondary)]
                   md:shadow-[var(--shadow-offset-md)_var(--color-secondary)]
                   hover:bg-secondary hover:text-accent
                   hover:shadow-[var(--shadow-offset-md)_var(--color-accent)]"
          >
            <span class="font-sans-bold text-[20px] md:text-[28px] uppercase">
              FÅ ADGANG
            </span>
          </button>
        </form>
      </div>
    </div>
  `;

  // Fade-in
  requestAnimationFrame(() => {
    overlay.firstElementChild.classList.add("opacity-100");
  });

  // Lås scrolling
  document.documentElement.classList.add("overflow-hidden");
  document.body.classList.add("overflow-hidden");

  const form = overlay.querySelector("form");
  const input = overlay.querySelector("input");
  const error = overlay.querySelector("#login-error");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (input.value.trim() === PASSWORD) {
      localStorage.setItem(STORAGE_KEY, "true");

      // Fade-out
      overlay.firstElementChild.classList.remove("opacity-100");
      overlay.firstElementChild.classList.add("opacity-0");

      setTimeout(() => {
        overlay.remove();
        document.documentElement.classList.remove("overflow-hidden");
        document.body.classList.remove("overflow-hidden");
      }, 250);
    } else {
      error.classList.remove("hidden");
      input.value = "";
      input.focus();
    }
  });

  setTimeout(() => input.focus(), 0);

  return overlay;
}

window.addEventListener("load", () => {
  if (localStorage.getItem(STORAGE_KEY) === "true") return;
  document.body.prepend(createOverlay());
});
