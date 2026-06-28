const navToggle = document.querySelector(".nav-toggle");
const primaryNav = document.querySelector("#primary-nav");

if (navToggle && primaryNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = primaryNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  primaryNav.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      primaryNav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
}

const bookingForm = document.querySelector("[data-booking-form]");

if (bookingForm) {
  bookingForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const submitButton = bookingForm.querySelector('button[type="submit"]');
    const confirmation = bookingForm.querySelector(".form-confirmation");
    const recipient = bookingForm.dataset.recipient || "info@albanplumbing.co.uk";
    const data = new FormData(bookingForm);
    const subjectLine = String(data.get("subject") || "").trim();
    const messageBody = String(data.get("message") || "").trim();
    const payload = {
      name: String(data.get("name") || "").trim(),
      phone: String(data.get("phone") || "").trim(),
      email: String(data.get("email") || "").trim() || null,
      address: String(data.get("address") || "").trim() || null,
      postcode: String(data.get("postcode") || "").trim(),
      service_required: String(data.get("service") || "").trim(),
      preferred_date: data.get("date") || null,
      preferred_time: data.get("time") || null,
      message: [subjectLine && `Subject: ${subjectLine}`, messageBody].filter(Boolean).join("\n\n") || null,
      source_page: window.location.href,
      user_agent: navigator.userAgent,
    };

    const showMessage = (message, isError = false) => {
      if (!confirmation) return;
      confirmation.textContent = message;
      confirmation.hidden = false;
      confirmation.classList.toggle("is-error", isError);
      confirmation.scrollIntoView({ behavior: "smooth", block: "center" });
    };

    const openEmailDraft = () => {
      const lines = [
        "New booking request from the website:",
        "",
        `Name: ${payload.name}`,
        `Phone: ${payload.phone}`,
        `Email: ${payload.email || ""}`,
        `Address: ${payload.address || ""}`,
        `Postcode: ${payload.postcode}`,
        `Service Required: ${payload.service_required}`,
        `Preferred Date: ${payload.preferred_date || ""}`,
        `Preferred Time: ${payload.preferred_time || ""}`,
        `Subject: ${subjectLine}`,
        "",
        "Message:",
        `${messageBody || ""}`,
        "",
        "Photos: Please attach any photos to this email before sending.",
      ];
      const subject = encodeURIComponent(`Website booking request - ${payload.service_required || "Service enquiry"}`);
      const body = encodeURIComponent(lines.join("\n"));
      window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
    };

    submitButton?.setAttribute("disabled", "disabled");

    try {
      const supabaseUrl = bookingForm.dataset.supabaseUrl;
      const supabaseKey = bookingForm.dataset.supabaseKey;
      if (!supabaseUrl || !supabaseKey) throw new Error("Supabase is not configured.");

      const response = await fetch(`${supabaseUrl}/rest/v1/booking_requests`, {
        method: "POST",
        headers: {
          apikey: supabaseKey,
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error(`Supabase returned ${response.status}.`);

      showMessage("Thank you. Your booking request has been sent successfully.");
      bookingForm.reset();
    } catch (error) {
      console.error(error);
      showMessage(
        "We could not save the request automatically. Your email app will open with the booking details ready to send.",
        true,
      );
      openEmailDraft();
    } finally {
      submitButton?.removeAttribute("disabled");
    }
  });
}

const consent = document.querySelector(".cookie-consent");

if (consent && !localStorage.getItem("aph-cookie-consent")) {
  consent.hidden = false;
  const button = consent.querySelector("button");
  button?.addEventListener("click", () => {
    localStorage.setItem("aph-cookie-consent", "accepted");
    consent.hidden = true;
  });
}
