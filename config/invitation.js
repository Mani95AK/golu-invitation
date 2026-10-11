function env(name, fallback) {
  const value = process.env[name];
  return value == null || value.trim() === "" ? fallback : value.trim();
}

function boolEnv(name, fallback) {
  const value = process.env[name];
  if (value == null || value.trim() === "") return fallback;
  return ["1", "true", "yes", "on"].includes(value.trim().toLowerCase());
}

function buildConfig() {
  const address = env(
    "ADDRESS",
    "123 Example Street, Sample Neighbourhood, City 000000, Tamil Nadu, India"
  );

  return {
    familyName: env("FAMILY_NAME", "The [Your Family Name] Family"),
    eventDate: env("EVENT_DATE", "2026-10-18"),
    eventTime: env("EVENT_TIME", "18:00"),
    eventTimezone: env("EVENT_TIMEZONE", "Asia/Kolkata"),
    eventTimeDisplay: env("EVENT_TIME_DISPLAY", "6:00 PM IST"),
    address,
    mapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`,
    countdownEnabled: boolEnv("COUNTDOWN_ENABLED", true),
    publicUrl: env("PUBLIC_URL", ""),
    copy: {
      en: {
        heading: "You're Invited to Our Navaratri Golu",
        kicker: "Navaratri · Golu Darshan",
        greeting: "Dear family and friends,",
        body: "With warm hearts and lighted lamps, we invite you to our home for Navaratri Golu. Come sit with us, admire the dolls, share prasadam, and celebrate the nine sacred nights of the Divine Mother.",
        blessing: "May Devi's grace fill your home with light, music, and abundance.",
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
        body: "விளக்குகள் மின்னும் எங்கள் இல்லத்தில் நவராத்திரி கோலைக் காண உங்களையும் உங்கள் குடும்பத்தையும் அன்புடன் வரவேற்கிறோம். பொம்மைகளைப் பார்த்து, பிரசாதம் ஏற்று, அன்னை தேவியின் ஒன்பது இரவுகளை எங்களுடன் கொண்டாடுங்கள்.",
        blessing: "தேவியின் அருள் உங்கள் இல்லத்தை ஒளியாலும் இசையாலும் நிறைவிக்கட்டும்.",
        hostedBy: "அன்புடன்,",
        whenLabel: "நாள் மற்றும் நேரம்",
        whereLabel: "இடம்",
        directions: "வழிகாட்டி",
        shareWhatsApp: "WhatsApp-ல் பகிரவும்",
        copyLink: "அழைப்பு இணைப்பை நகலெடு",
        copyText: "அழைப்பு உரையை நகலெடு",
        copied: "நகலெடுக்கப்பட்டது",
        copyFailed: "நகலெடுக்க முடியவில்லை. உரையை நீங்களே நகலெடுக்கவும்.",
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

module.exports = { buildConfig };
