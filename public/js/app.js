(() => {
  const state = {
    lang: localStorage.getItem("golu-lang") === "ta" ? "ta" : "en",
    config: null,
    timer: null,
  };

  const els = {
    langToggle: document.getElementById("lang-toggle"),
    kicker: document.getElementById("kicker"),
    heading: document.getElementById("heading"),
    greeting: document.getElementById("greeting"),
    body: document.getElementById("body"),
    blessing: document.getElementById("blessing"),
    hostedLabel: document.getElementById("hosted-label"),
    familyName: document.getElementById("family-name"),
    whenLabel: document.getElementById("when-label"),
    whenValue: document.getElementById("when-value"),
    whereLabel: document.getElementById("where-label"),
    whereValue: document.getElementById("where-value"),
    mapsLink: document.getElementById("maps-link"),
    whatsappLink: document.getElementById("whatsapp-link"),
    copyLink: document.getElementById("copy-link"),
    copyText: document.getElementById("copy-text"),
    status: document.getElementById("status"),
    countdown: document.getElementById("countdown"),
    countdownTitle: document.getElementById("countdown-title"),
    countdownNote: document.getElementById("countdown-note"),
    errorBanner: document.getElementById("error-banner"),
    days: document.getElementById("cd-days"),
    hours: document.getElementById("cd-hours"),
    mins: document.getElementById("cd-mins"),
    secs: document.getElementById("cd-secs"),
    daysL: document.getElementById("cd-days-l"),
    hoursL: document.getElementById("cd-hours-l"),
    minsL: document.getElementById("cd-mins-l"),
    secsL: document.getElementById("cd-secs-l"),
  };

  function copyText(lang) {
    return state.config.copy[lang];
  }

  function eventDate() {
    const { eventDate, eventTime } = state.config;
    const date = new Date(`${eventDate}T${eventTime}:00+05:30`);
    if (Number.isNaN(date.getTime())) return null;
    return date;
  }

  function formatWhen(lang) {
    const date = eventDate();
    const locale = lang === "ta" ? "ta-IN" : "en-IN";
    if (!date || Number.isNaN(date.getTime())) {
      return `${state.config.eventDate} · ${state.config.eventTimeDisplay}`;
    }
    const formatted = new Intl.DateTimeFormat(locale, {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: state.config.eventTimezone,
    }).format(date);
    return `${formatted} · ${state.config.eventTimeDisplay}`;
  }

  function inviteUrl() {
    if (state.config.publicUrl) return state.config.publicUrl;
    return window.location.origin + window.location.pathname;
  }

  function sharePayload(lang) {
    const t = copyText(lang);
    return t.shareMessage
      .replace("{familyName}", state.config.familyName)
      .replace("{when}", formatWhen(lang))
      .replace("{address}", state.config.address)
      .replace("{mapsUrl}", state.config.mapsUrl)
      .replace("{inviteUrl}", inviteUrl());
  }

  function pad(n) {
    return String(n).padStart(2, "0");
  }

  function renderCountdown() {
    const t = copyText(state.lang);
    const date = eventDate();
    if (!state.config.countdownEnabled || !date) {
      els.countdown.hidden = true;
      els.countdownNote.hidden = true;
      return;
    }

    const diff = date.getTime() - Date.now();
    if (diff > 0) {
      els.countdown.hidden = false;
      els.countdownNote.hidden = true;
      els.countdownTitle.textContent = t.countdownTitle;
      els.daysL.textContent = t.days;
      els.hoursL.textContent = t.hours;
      els.minsL.textContent = t.minutes;
      els.secsL.textContent = t.seconds;
      const total = Math.floor(diff / 1000);
      els.days.textContent = pad(Math.floor(total / 86400));
      els.hours.textContent = pad(Math.floor((total % 86400) / 3600));
      els.mins.textContent = pad(Math.floor((total % 3600) / 60));
      els.secs.textContent = pad(total % 60);
      return;
    }

    els.countdown.hidden = true;
    els.countdownNote.hidden = false;
    const sixHours = 6 * 60 * 60 * 1000;
    els.countdownNote.textContent =
      Date.now() - date.getTime() < sixHours ? t.underway : t.past;
  }

  function render() {
    const lang = state.lang;
    const t = copyText(lang);
    document.documentElement.lang = lang === "ta" ? "ta" : "en";
    document.body.classList.toggle("ta", lang === "ta");
    els.langToggle.textContent = t.otherLang;
    els.kicker.textContent = t.kicker;
    els.heading.textContent = t.heading;
    document.title = t.heading;
    els.greeting.textContent = t.greeting;
    els.body.textContent = t.body;
    els.blessing.textContent = t.blessing;
    els.hostedLabel.textContent = t.hostedBy;
    els.familyName.textContent = state.config.familyName;
    els.whenLabel.textContent = t.whenLabel;
    els.whenValue.textContent = formatWhen(lang);
    els.whereLabel.textContent = t.whereLabel;
    els.whereValue.textContent = state.config.address;
    els.mapsLink.href = state.config.mapsUrl;
    els.mapsLink.textContent = t.directions;
    els.whatsappLink.href = `https://wa.me/?text=${encodeURIComponent(sharePayload(lang))}`;
    els.whatsappLink.textContent = t.shareWhatsApp;
    els.copyLink.textContent = t.copyLink;
    els.copyText.textContent = t.copyText;
    renderCountdown();
  }

  async function copy(value, okMessage) {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(value);
      } else {
        const area = document.createElement("textarea");
        area.value = value;
        area.setAttribute("readonly", "");
        area.style.position = "fixed";
        area.style.left = "-9999px";
        document.body.appendChild(area);
        area.select();
        document.execCommand("copy");
        document.body.removeChild(area);
      }
      els.status.textContent = okMessage;
    } catch {
      els.status.textContent = copyText(state.lang).copyFailed;
    }
  }

  function bind() {
    els.langToggle.addEventListener("click", () => {
      state.lang = state.lang === "en" ? "ta" : "en";
      localStorage.setItem("golu-lang", state.lang);
      els.status.textContent = "";
      render();
    });

    els.copyLink.addEventListener("click", () => {
      copy(inviteUrl(), copyText(state.lang).copied);
    });

    els.copyText.addEventListener("click", () => {
      copy(sharePayload(state.lang), copyText(state.lang).copied);
    });
  }

  async function init() {
    bind();
    try {
      const response = await fetch("/api/invitation", { headers: { Accept: "application/json" } });
      if (!response.ok) throw new Error("bad response");
      state.config = await response.json();
    } catch {
      els.errorBanner.hidden = false;
      state.config = {
        familyName: els.familyName.textContent.trim(),
        eventDate: "2026-10-18",
        eventTime: "18:00",
        eventTimezone: "Asia/Kolkata",
        eventTimeDisplay: "6:00 PM IST",
        address: els.whereValue.textContent.replace(/\s+/g, " ").trim(),
        mapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(els.whereValue.textContent)}`,
        countdownEnabled: true,
        publicUrl: "",
        copy: {
          en: {
            heading: els.heading.textContent,
            kicker: els.kicker.textContent,
            greeting: els.greeting.textContent,
            body: els.body.textContent,
            blessing: els.blessing.textContent,
            hostedBy: "With love,",
            whenLabel: "When",
            whereLabel: "Where",
            directions: "Get directions",
            shareWhatsApp: "Share on WhatsApp",
            copyLink: "Copy invitation link",
            copyText: "Copy invitation text",
            copied: "Copied",
            copyFailed: "Could not copy. Please copy the text manually.",
            countdownTitle: "Golu begins in",
            days: "Days",
            hours: "Hours",
            minutes: "Minutes",
            seconds: "Seconds",
            underway: "The Golu is underway. You are welcome to visit.",
            past: "Thank you for celebrating Navaratri with us.",
            langLabel: "English",
            otherLang: "தமிழ்",
            shareMessage:
              "You're invited to our Navaratri Golu.\n\nHosted by {familyName}\nWhen: {when}\nWhere: {address}\n\nDirections: {mapsUrl}\nInvitation: {inviteUrl}",
          },
          ta: {
            heading: "எங்கள் நவராத்திரி கோலுக்கு அன்புடன் அழைக்கிறோம்",
            kicker: "நவராத்திரி · கோலு தரிசனம்",
            greeting: "அன்புள்ள உறவினர்களே, நண்பர்களே,",
            body: "விளக்குகள் மின்னும் எங்கள் இல்லத்தில் நவராத்திரி கோலைக் காண உங்களையும் உங்கள் குடும்பத்தையும் அன்புடன் வரவேற்கிறோம்.",
            blessing: "தேவியின் அருள் உங்கள் இல்லத்தை ஒளியாலும் இசையாலும் நிறைவிக்கட்டும்.",
            hostedBy: "அன்புடன்,",
            whenLabel: "நாள் மற்றும் நேரம்",
            whereLabel: "இடம்",
            directions: "வழிகாட்டி",
            shareWhatsApp: "WhatsApp-ல் பகிரவும்",
            copyLink: "அழைப்பு இணைப்பை நகலெடு",
            copyText: "அழைப்பு உரையை நகலெடு",
            copied: "நகலெடுக்கப்பட்டது",
            copyFailed: "நகலெடுக்க முடியவில்லை.",
            countdownTitle: "கோலு தொடங்க",
            days: "நாட்கள்",
            hours: "மணி",
            minutes: "நிமிடம்",
            seconds: "வினாடி",
            underway: "கோலு நடைபெற்றுக் கொண்டிருக்கிறது. வருக.",
            past: "நவராத்திரியை எங்களுடன் கொண்டாடியதற்கு நன்றி.",
            langLabel: "தமிழ்",
            otherLang: "English",
            shareMessage:
              "எங்கள் நவராத்திரி கோலுக்கு அன்புடன் அழைக்கிறோம்.\n\n{familyName}\nநாள்: {when}\nஇடம்: {address}\n\nவழிகாட்டி: {mapsUrl}\nஅழைப்பு: {inviteUrl}",
          },
        },
      };
    }

    render();
    state.timer = window.setInterval(renderCountdown, 1000);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
