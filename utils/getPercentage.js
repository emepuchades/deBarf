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
      let catPercentage;
      const catAge = await getAge(date);
      const catMonths = catAge.remainingMonths;

      if (catAge.years >= 11) {
        catPercentage = 0.02;
      } else if (catAge.years === 0) {
        if (catMonths <= 2) {
          catPercentage = 0.1;
        } else if (catMonths <= 4) {
          catPercentage = 0.08;
        } else if (catMonths <= 6) {
          catPercentage = 0.06;
        }
      } else {
        switch (activity) {
          case "baja":
            catPercentage = 0.02;
            break;
          case "media":
            catPercentage = 0.04;
            break;
          case "alta":
            catPercentage = 0.05;
            break;
          default:
            catPercentage = 0.02;
        }
      }

      if (isSterilized) {
        catPercentage = 0.02;
      }
      if (weight <= 3 || isSportingDog) {
        catPercentage = 0.05
      }

      return catPercentage;
    case "huron":
      let percentageFerret;
      const ageFerret = await getAge(date);
      const ageYears = ageFerret.years;

      if (ageYears < 1) {
        percentageFerret = 0.1;
      } else {
        const currentMonth = new Date().getMonth();
        const isSummer = currentMonth >= 3 && currentMonth <= 8;

        if (isSummer) {
          percentageFerret = 0.03; 
        } else {
          percentageFerret = 0.08;
        }
      }

      return percentageFerret;
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
