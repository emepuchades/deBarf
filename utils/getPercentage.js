async function getPercentage(
  selectedPet,
  activity,
  date,
  isSterilized,
  weight,
  isGreyhound,
  isSportingDog
) {
  switch (selectedPet) {
    case "perro":
      let percentage;
      const age = await getAge(date);
      const months = age.remainingMonths;

      if (age.years >= 7) {
        percentage = 0.02; // Senior dogs
      } else if (age.years === 0) {
        if (months <= 2) {
          percentage = 0.1;
        } else if (months <= 4) {
          percentage = 0.08;
        } else if (months <= 6) {
          percentage = 0.06;
        } else if (months <= 8) {
          percentage = 0.04;
        } else if (months <= 10) {
          percentage = 0.03;
        }
      } else {
        switch (activity) {
          case "baja":
            percentage = 0.02;
            break;
          case "media":
            percentage = 0.025;
            break;
          case "alta":
            percentage = 0.03;
            break;
          default:
            percentage = 0.02;
        }
      }

      if (isSterilized) {
        percentage = 0.02;
      }
      if (weight <= 3 || isGreyhound || isSportingDog) {
        percentage = 0.035; 
      }

      return percentage;

    case "gato":
      return null;
      break;
    case "huron":
      return null;
      break;
    default:
      return null;
  }
}

async function getAge(date) {
  const providedDate = date;

  const dateObject = new Date(providedDate);
  const currentDate = new Date();

  const timeDifferenceInMilliseconds = currentDate - dateObject;
  const millisecondsInAYear = 365.25 * 24 * 60 * 60 * 1000;

  const timeDifferenceInYears =
    timeDifferenceInMilliseconds / millisecondsInAYear;
  const years = Math.floor(timeDifferenceInYears);
  const remainingMonths = Math.floor((timeDifferenceInYears - years) * 12);

  return { years: years, remainingMonths: remainingMonths };
}

export default getPercentage;
