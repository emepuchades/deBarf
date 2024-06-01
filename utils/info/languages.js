export const languages = [
  {
    label: "Español (España)",
    value: "es-ES",
  },
  {
    label: "English (United States)",
    value: "en-US",
  },
  {
    label: "English (United Kingdom)",
    value: "en-GB",
  },
];

 export const parseLanguages = (param) => {
    switch (param) {
      case "es-ES":
        return "es";
      case "en-US":
        return "us";
      case "en-GB":
        return "gb";
      default:
        return "es";
    }
  };
