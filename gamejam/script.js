gsap.registerPlugin(ScrollTrigger);

//incio --------------------------------------------------------------------------------------patrocinios carrosel
document.addEventListener("DOMContentLoaded", function () {
  new Splide("#image-carousel", {
    type: "loop",
    perPage: 5, // Adjust based on how many images you want visible
    focus: "center", // Centers the active slide
    gap: "5%", // Space between slides
    arrows: false,
    pagination: false,
    autoScroll: {
      speed: 0.8,
    },
  }).mount(window.splide.Extensions);
});
//fim --------------------------------------------------------------------------------------patrocinios carrosel

//incio --------------------------------------------------------------------------------------cartas inicio main-pic
const cards = document.querySelectorAll(".card");
const motionMatchMedia = window.matchMedia("(prefers-reduced-motion)");
const THRESHOLD = 15;

function handleHover(e) {
  const card = e.currentTarget;
  const { clientX, clientY } = e;
  const { clientWidth, clientHeight } = card;
  const offsetLeft = card.getBoundingClientRect().left;
  const offsetTop = card.getBoundingClientRect().top;

  const horizontal = (clientX - offsetLeft) / clientWidth;
  const vertical = (clientY - offsetTop) / clientHeight;
  const rotateX = (THRESHOLD / 2 - horizontal * THRESHOLD).toFixed(2);
  const rotateY = (vertical * THRESHOLD - THRESHOLD / 2).toFixed(2);

  card.style.transform = `perspective(${clientWidth}px) rotateX(${rotateY}deg) rotateY(${rotateX}deg) scale3d(1, 1, 1)`;
}

function resetStyles(e) {
  const card = e.currentTarget;
  card.style.transform = `perspective(${card.clientWidth}px) rotateX(0deg) rotateY(0deg)`;
}

if (!motionMatchMedia.matches) {
  cards.forEach((card) => {
    card.addEventListener("mousemove", handleHover);
    card.addEventListener("mouseleave", resetStyles);
  });
}

//fim --------------------------------------------------------------------------------------cartas inicio main-pic

//incio ------------------------------------------------------------------------------------- menu para tele

const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");

hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});

navMenu.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});
//fim ------------------------------------------------------------------------------------- menu para tele

//incio --------------------------------------------------------------------------------------forms animações pagina

function toggleVegetarianInfo(isVegetarian) {
  const info = document.getElementById("vegetarian-info");
  if (isVegetarian) {
    info.style.display = "block";
  } else {
    info.style.display = "none";
  }
}

function toggleTeamInfo(isTeam) {
  const info = document.getElementById("team-info");
  if (isTeam) {
    info.style.display = "block";
  } else {
    info.style.display = "none";
  }
}

function initModal(modalId, insbtnId, closeClass, headerSelector) {
  const modal = document.getElementById(modalId);
  const btn = document.getElementById(insbtnId);
  const span = document.getElementsByClassName(closeClass)[0];
  const header = document.querySelector(headerSelector); // Select the header

  // Create the overlay element
  let overlay = document.createElement("div");
  overlay.className = "modal-overlay";
  document.body.appendChild(overlay);

  // Set initial position for the modal
  gsap.set(modal, {
    display: "none",
    opacity: 1,
    y: "-100%", // Off the top of the screen
  });

  // Open the modal
  btn.onclick = function () {
    document.documentElement.classList.add("modal-open"); // Disable scrolling on <html>
    overlay.style.display = "block"; // Show the overlay
    gsap.set(modal, { display: "flex" }); // Ensure the modal is visible before animation

    // Slide the header up
    if (header) {
      gsap.to(header, {
        y: "-100%", // Slide the header up
        opacity: 0, // Fade out the header
        duration: 0.5, // Animation duration
        ease: "power2.out", // Smooth easing
      });
    }

    gsap.to(modal, {
      opacity: 1,
      y: "0%", // Slide down from the top
      duration: 0.5,
      ease: "power2.out",
    });
  };

  // Close the modal
  span.onclick = function () {
    gsap.to(modal, {
      opacity: 1,
      y: "-100%", // Slide out to the top
      duration: 0.7,
      ease: "power2.in",
      onComplete: function () {
        modal.style.display = "none";
        overlay.style.display = "none"; // Hide the overlay
        document.documentElement.classList.remove("modal-open"); // Remove blackout

        // Slide the header back to its original position
        if (header) {
          gsap.to(header, {
            y: "0%", // Reset the header position
            opacity: 1, // Fade the header back in
            duration: 0.5, // Animation duration
            ease: "power2.out", // Smooth easing
          });
        }
      },
    });
  };

  // Close the modal when clicking outside of it
  overlay.onclick = function () {
    gsap.to(modal, {
      opacity: 1,
      y: "-100%", // Slide out to the top
      duration: 0.5,
      ease: "power2.in",
      onComplete: function () {
        modal.style.display = "none";
        overlay.style.display = "none"; // Hide the overlay
        document.documentElement.classList.remove("modal-open"); // Remove blackout

        // Slide the header back to its original position
        if (header) {
          gsap.to(header, {
            y: "0%", // Reset the header position
            opacity: 1, // Fade the header back in
            duration: 0.5, // Animation duration
            ease: "power2.out", // Smooth easing
          });
        }
      },
    });
  };
}

// Example usage
initModal("myModal", "insbtn", "close", ".header");
//fim --------------------------------------------------------------------------------------forms animações pagina

//incio --------------------------------------------------------------------------------------forms
// Initialize EmailJS
emailjs.init("2Fe9tfnThUiSTgNsb"); // Replace "YOUR_USER_ID" with your EmailJS user ID

function initializeModalsAndForm() {
  console.log("Initializing modals and form...");

  // Initialize modals with different animations
  initModal("myModal", "insbtn", "close", ".header"); // myModal comes from the top

  // Form submission handling
  const formElement = document.getElementById("myGoogleForm");
  if (!formElement) {
    console.error("Form with ID 'myGoogleForm' not found.");
    return;
  }

  formElement.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission
    console.log("Form submission triggered.");

    const form = event.target;
    const formData = new FormData(form);
    const userEmail = formData.get("entry.754264033"); // Replace 'entry.xx' with the actual name attribute for the email field in your Google Form
    console.log("Retrieved email:", userEmail);

    let btn = document.querySelector(".submit-btn");
    if (!btn) {
      console.error("Submit button with class 'submit-btn' not found.");
      return;
    }

    if (!userEmail) {
      alert("Insira um Email válido.");
      console.error("Insira um email Válido.");
      return;
    }

    // Disable the button or add a loading state
    btn.disabled = true;
    btn.classList.add("is_active");
    console.log("Submit button disabled and loading state applied.");

    // Send the form data to Google Forms
    fetch(
      "https://docs.google.com/forms/d/e/1FAIpQLSfhwbhMjGVHRn4HsGQmMYjdAv9lrwVazW4tmD1aPKPnFzk8kQ/formResponse",
      {
        method: "POST",
        body: formData,
        mode: "no-cors", // Google Forms doesn't return a response, so we use 'no-cors'
      }
    )
      .then(() => {
        console.log("Form data successfully sent to Google Forms.");

        // Send a confirmation email using EmailJS
        emailjs
          .send("service_hagzic8", "template_c50opin", {
            user_email: userEmail, // Pass the user's email to the template
          })
          .then(
            () => {
              console.log("Confirmation email sent successfully.");

              form.reset(); // Reset the form

              // Delay for 1.5 seconds before returning the button to its normal state
              setTimeout(() => {
                btn.classList.remove("is_active");
                btn.disabled = false; // Re-enable the button
                console.log("Submit button re-enabled.");
              }, 1500);
            },
            (error) => {
              console.error("EmailJS Error:", error);

              btn.disabled = false; // Re-enable the button on error
            }
          );
      })
      .catch((error) => {
        console.error("Google Form Error:", error);

        btn.disabled = false; // Re-enable the button on error
      });
  });
}

initializeModalsAndForm();
//fim --------------------------------------------------------------------------------------forms

//incio --------------------------------------------------------------------------------------animações

window.addEventListener("DOMContentLoaded", () => {
  // Stagger logo + nav links from top
  gsap.to([".nav-logo", "#navMenu li"], {
    opacity: 1,
    y: 0,
    duration: 0.6,
    ease: "power3.out",
    stagger: 0.1,
  });

  //for the header
  gsap.to(".header", {
    opacity: 1,
    y: 0,
    duration: 0.9,
    stagger: 0.1,
    ease: "power3.out",
  });
  // Animate gallery cards from bottom to top
  gsap.to(".gallery-grid .card", {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: "power3.out",
    stagger: 0.1,
  });

  // Animate main-content items from right to left
  gsap.to([".ipca", ".game", ".ano", ".data", ".ins_button"], {
    opacity: 1,
    x: 0,
    duration: 0.8,
    ease: "power3.out",
    stagger: 0.15,
    delay: 0.6,
  });
});

window.addEventListener("load", function () {
  gsap.to(".info-content h2, .info-content p", {
    opacity: 1, // Animate to opacity 1
    y: 0, // Animate to the normal position (y = 0)
    duration: 1,
    ease: "power3.out",
    stagger: 0.2, // Apply staggered delay to each element
    scrollTrigger: {
      trigger: ".info-section", // Set the trigger element
      start: "top 50%", // Trigger when the top of .info-section reaches 50% of the viewport
      end: "40% 50%", // End when the bottom of .info-section reaches 50% of the viewport
      scrub: true, // Make the animation sync with scroll position
      markers: false, // Disable markers, but can enable for debugging
      invalidateOnRefresh: true, // Recalculate trigger positions when window is resized
    },
  });
});

window.addEventListener("load", function () {
  // Background animation (Container grows horizontally)
  gsap.from(".continfo", {
    scaleX: 0, // Start with the cont scaled horizontally to 0
    opacity: 1, // Initially hidden
    duration: 1, // Animation duration
    ease: "power3.out", // Easing function
    scrollTrigger: {
      trigger: ".continfo", // The trigger element is the #info section
      start: "-200% 50%", // Start when the top of #info reaches 80% of the viewport
      end: "bottom 50%", // End when the bottom of #info reaches 50% of the viewport
      scrub: true, // Sync with scroll position
      markers: false, // Hide debug markers
      invalidateOnRefresh: true, // Recalculate on window resize
    },
  });

  // Text animation (Fade-in the h2 after the background is fully stretched)
  gsap.to(".continfo h2", {
    opacity: 1, // Fade in the text
    duration: 1, // Animation duration
    ease: "power3.out", // Easing function
    delay: 1, // Add delay for text to fade in after the background grows
    scrollTrigger: {
      trigger: ".info-section", // Trigger the text animation after the container has been fully stretched
      start: "top 50%", // Start when the top of the container reaches 80% of the viewport
      end: "bottom 50%", // End when the bottom of the container reaches 50% of the viewport
      scrub: true, // Sync with scroll position
      markers: false, // Hide debug markers
      invalidateOnRefresh: true, // Recalculate on window resize
    },
  });

  gsap.from(".conthor", {
    scaleX: 0, // Start with the cont scaled horizontally to 0
    opacity: 1, // Initially hidden
    duration: 1, // Animation duration
    ease: "power3.out", // Easing function
    scrollTrigger: {
      trigger: ".conthor", // Trigger based on .anotherCont section
      start: "top 80%", // Start when the top of .anotherCont reaches 80% of the viewport
      end: "bottom 50%", // End when the bottom of .anotherCont reaches 50% of the viewport
      scrub: true, // Sync with scroll position
      markers: false, // Hide debug markers
      invalidateOnRefresh: true, // Recalculate on window resize
    },
  });

  // Text animation for .anotherCont (Fade-in the h2 inside .anotherCont after it expands)
  gsap.to(".conthor h2", {
    opacity: 1, // Fade in the text
    duration: 1, // Animation duration
    ease: "power3.out", // Easing function
    delay: 1, // Delay the text fade-in after the background is stretched
    scrollTrigger: {
      trigger: ".horário-content", // Trigger based on the .anotherCont section
      start: "top 80%", // Start when the top of .anotherCont reaches 80% of the viewport
      end: "bottom 50%", // End when the bottom of .anotherCont reaches 50% of the viewport
      scrub: true, // Sync with scroll position
      markers: false, // Hide debug markers
      invalidateOnRefresh: true, // Recalculate on window resize
    },
  });

  gsap.from(".contpre", {
    scaleX: 0, // Start with the cont scaled horizontally to 0
    opacity: 1, // Initially hidden
    duration: 1, // Animation duration
    ease: "power3.out", // Easing function
    scrollTrigger: {
      trigger: ".contpre", // Trigger based on .anotherCont section
      start: "top 80%", // Start when the top of .anotherCont reaches 80% of the viewport
      end: "bottom 50%", // End when the bottom of .anotherCont reaches 50% of the viewport
      scrub: true, // Sync with scroll position
      markers: false, // Hide debug markers
      invalidateOnRefresh: true, // Recalculate on window resize
    },
  });

  // Text animation for .anotherCont (Fade-in the h2 inside .anotherCont after it expands)
  gsap.to(".contpre h2", {
    opacity: 1, // Fade in the text
    duration: 1, // Animation duration
    ease: "power3.out", // Easing function
    delay: 1, // Delay the text fade-in after the background is stretched
    scrollTrigger: {
      trigger: ".prémios-content", // Trigger based on the .anotherCont section
      start: "top 80%", // Start when the top of .anotherCont reaches 80% of the viewport
      end: "bottom 50%", // End when the bottom of .anotherCont reaches 50% of the viewport
      scrub: true, // Sync with scroll position
      markers: false, // Hide debug markers
      invalidateOnRefresh: true, // Recalculate on window resize
    },
  });

  gsap.from(".contapoi", {
    scaleX: 0, // Start with the cont scaled horizontally to 0
    opacity: 1, // Initially hidden
    duration: 1, // Animation duration
    ease: "power3.out", // Easing function
    scrollTrigger: {
      trigger: ".contapoi", // Trigger based on .anotherCont section
      start: "top 80%", // Start when the top of .anotherCont reaches 80% of the viewport
      end: "bottom 50%", // End when the bottom of .anotherCont reaches 50% of the viewport
      scrub: true, // Sync with scroll position
      markers: false, // Hide debug markers
      invalidateOnRefresh: true, // Recalculate on window resize
    },
  });

  // Text animation for .anotherCont (Fade-in the h2 inside .anotherCont after it expands)
  gsap.to(".contapoi h2", {
    opacity: 1, // Fade in the text
    duration: 1, // Animation duration
    ease: "power3.out", // Easing function
    delay: 1, // Delay the text fade-in after the background is stretched
    scrollTrigger: {
      trigger: ".apoios-content", // Trigger based on the .anotherCont section
      start: "top 80%", // Start when the top of .anotherCont reaches 80% of the viewport
      end: "bottom 50%", // End when the bottom of .anotherCont reaches 50% of the viewport
      scrub: true, // Sync with scroll position
      markers: false, // Hide debug markers
      invalidateOnRefresh: true, // Recalculate on window resize
    },
  });

  gsap.from(".contdir", {
    scaleX: 0, // Start with the cont scaled horizontally to 0
    opacity: 1, // Initially hidden
    duration: 1, // Animation duration
    ease: "power3.out", // Easing function
    scrollTrigger: {
      trigger: ".contdir", // Trigger based on .anotherCont section
      start: "top 80%", // Start when the top of .anotherCont reaches 80% of the viewport
      end: "bottom 50%", // End when the bottom of .anotherCont reaches 50% of the viewport
      scrub: true, // Sync with scroll position
      markers: false, // Hide debug markers
      invalidateOnRefresh: true, // Recalculate on window resize
    },
  });

  // Text animation for .anotherCont (Fade-in the h2 inside .anotherCont after it expands)
  gsap.to(".contdir h2", {
    opacity: 1, // Fade in the text
    duration: 1, // Animation duration
    ease: "power3.out", // Easing function
    delay: 1, // Delay the text fade-in after the background is stretched
    scrollTrigger: {
      trigger: ".direção-content", // Trigger based on the .anotherCont section
      start: "top 80%", // Start when the top of .anotherCont reaches 80% of the viewport
      end: "bottom 50%", // End when the bottom of .anotherCont reaches 50% of the viewport
      scrub: true, // Sync with scroll position
      markers: false, // Hide debug markers
      invalidateOnRefresh: true, // Recalculate on window resize
    },
  });
});

window.addEventListener("load", function () {
  gsap.to(".horário-content h2, .horário-content p , .horário-content h1", {
    opacity: 1, // Animate to opacity 1
    y: 0, // Animate to the normal position (y = 0)
    duration: 1,
    ease: "power3.out",
    stagger: 0.2, // Apply staggered delay to each element
    scrollTrigger: {
      trigger: ".horário-section", // Set the trigger element
      start: "top 50%", // Trigger when the top of .info-section reaches 50% of the viewport
      end: "40% 50%", // End when the bottom of .info-section reaches 50% of the viewport
      scrub: true, // Make the animation sync with scroll position
      markers: false, // Disable markers, but can enable for debugging
      invalidateOnRefresh: true, // Recalculate trigger positions when window is resized
    },
  });
});

window.addEventListener("load", function () {
  // Animate Segundo Lugar (after Primeiro Lugar)
  gsap.from(".segundo-lugar", {
    opacity: 0, // Initially hidden
    y: 50, // Start from below
    duration: 0.5, // Animation duration
    ease: "power3.out", // Easing function
    scrollTrigger: {
      trigger: ".prémios-content", // Trigger based on .prémios-content section
      start: "-50% 55%", // Start when the top of .prémios-content reaches 80% of the viewport
      end: "top 50%", // End when the bottom of .prémios-content reaches 50% of the viewport
      scrub: true, // Sync with scroll position
      markers: false, // Hide debug markers
    },
  });

  // Animate Primeiro Lugar
  gsap.from(".primeiro-lugar", {
    opacity: 0, // Initially hidden
    y: 50, // Start from below
    duration: 0.5, // Animation duration
    ease: "power3.out", // Easing function
    scrollTrigger: {
      trigger: ".prémios-content", // Trigger based on .prémios-content section
      start: "-100% 60%", // Start when the top of .prémios-content reaches 80% of the viewport
      end: "-50% 50%", // End when the bottom of .prémios-content reaches 50% of the viewport
      scrub: true, // Sync with scroll position
      markers: false, // Hide debug markers
    },
  });

  // Animate Terceiro Lugar (after Segundo Lugar)
  gsap.from(".terceiro-lugar", {
    opacity: 0, // Initially hidden
    y: 50, // Start from below
    duration: 0.5, // Animation duration
    ease: "power3.out", // Easing function
    scrollTrigger: {
      trigger: ".prémios-content", // Trigger based on .prémios-content section
      start: "-25% 51%", // Start when the top of .prémios-content reaches 80% of the viewport
      end: "25% 50%", // End when the bottom of .prémios-content reaches 50% of the viewport
      scrub: true, // Sync with scroll position
      markers: false, // Hide debug markers
    },
  });

  // Animate Quarto Lugar (after Terceiro Lugar)
  gsap.from(".quarto-lugar", {
    opacity: 0, // Initially hidden
    y: 50, // Start from below
    duration: 0.5, // Animation duration
    ease: "power3.out", // Easing function
    scrollTrigger: {
      trigger: ".prémios-content", // Trigger based on .prémios-content section
      start: "0% 52%", // Start when the top of .prémios-content reaches 80% of the viewport
      end: "50% 50%", // End when the bottom of .prémios-content reaches 50% of the viewport
      scrub: true, // Sync with scroll position
      markers: false, // Hide debug markers
    },
  });

  // Animate Quinto Lugar (after Quarto Lugar)
  gsap.from(".quinto-lugar", {
    opacity: 0, // Initially hidden
    y: 50, // Start from below
    duration: 0.5, // Animation duration
    ease: "power3.out", // Easing function
    scrollTrigger: {
      trigger: ".prémios-content", // Trigger based on .prémios-content section
      start: "25% 53%", // Start when the top of .prémios-content reaches 80% of the viewport
      end: "75% 50%", // End when the bottom of .prémios-content reaches 50% of the viewport
      scrub: true, // Sync with scroll position
      markers: false, // Hide debug markers
    },
  });
});

window.addEventListener("load", function () {
  gsap.from(".apoios-content", {
    opacity: 0, // Start transparent
    duration: 1.2, // Animation duration
    ease: "back.out(1.7)", // Easing to give it a bounce
    scrollTrigger: {
      trigger: ".apoios-content", // When this element is in view
      start: "top 80%", // Start animation when top reaches 80% of viewport
      end: "bottom 60%", // Optional end for scroll-based syncing
      scrub: true, // No scroll sync, animate on enter
      markers: false, // Enable to debug
    },
  });
});

window.addEventListener("load", function () {
  gsap.from(".direção-content", {
    opacity: 0, // Start transparent
    duration: 1.2, // Animation duration
    ease: "back.out(1.7)", // Easing to give it a bounce
    scrollTrigger: {
      trigger: ".direção-content", // When this element is in view
      start: "top 80%", // Start animation when top reaches 80% of viewport
      end: "bottom 60%", // Optional end for scroll-based syncing
      scrub: true, // No scroll sync, animate on enter
      markers: false, // Enable to debug
    },
  });
});
//fim --------------------------------------------------------------------------------------animações

//inicio --------------------------------------------------------------------------------------scroll-lenis
// Initialize Lenis
const lenis = new Lenis({
  autoRaf: true,
});

// Listen for the scroll event and log the event data
lenis.on("scroll", (e) => {
  console.log(e);
});
//fim --------------------------------------------------------------------------------------scroll-lenis
