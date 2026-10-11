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
    familyName: env("FAMILY_NAME", "[Your Family Name] Family"),
    eventDate: "2026-10-11",
    address,
    mapsUrl: `https://maps.app.goo.gl/RdYLpSpVDYKuQpde9}`,
    countdownEnabled: boolEnv("COUNTDOWN_ENABLED", false),
    publicUrl: env("PUBLIC_URL", ""),
    copy: {
      en: {
        heading: "You're Invited to Our Navaratri Golu",
        kicker: "Navaratri · Golu Darshan",
        greeting: "Dear family and friends,",
        body: "With love, devotion, and the glow of traditional lamps, we warmly invite you and your family to our home for Navaratri Golu. Come enjoy the beautiful Golu display, receive prasadam, and share in the joy and blessings of this auspicious celebration.",
        blessing: "May Goddess Durga bless you and your family with happiness, peace, prosperity, and abundance.",
        hostedBy: "With love,",
        whenLabel: "Date",
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
        body: "அன்பும் பக்தியும் பாரம்பரிய விளக்குகளின் ஒளியும் நிறைந்த இந்த இனிய தருணத்தில், நவராத்திரி கொலு விழாவிற்குத் தங்களையும் தங்கள் குடும்பத்தினரையும் எங்கள் இல்லத்திற்கு அன்புடன் அழைக்கிறோம். அழகிய கொலு அலங்காரத்தைக் கண்டு மகிழ்ந்து, பிரசாதம் பெற்று, இந்த மங்களகரமான விழாவின் மகிழ்ச்சியையும் இறையருளையும் எங்களுடன் பகிர்ந்து கொள்ள வாருங்கள்.",
        blessing: "அன்னை துர்கா தேவி தங்களுக்கும் தங்கள் குடும்பத்தினருக்கும் மகிழ்ச்சி, அமைதி, செழிப்பு மற்றும் எல்லா வளங்களையும் அருளி ஆசீர்வதிக்கட்டும்.",
        hostedBy: "அன்புடன்,",
        whenLabel: "நாள்",
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
