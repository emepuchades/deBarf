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
        catPercentage = 0.05;
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

export async function calculateBARFDiet(selectedPet) {
  const weightInKg = selectedPet.weight;

  switch (selectedPet.typePet) {
    case "perro":
      let meatPercentage = selectedPet.percentage;
      const grMenuDiary = weightInKg * meatPercentage * 1000; // Convert weight to grams
      const meatAmount = grMenuDiary * 0.3; // 30% of grMenuDiary as meat
      const bonesAmount = grMenuDiary * 0.45; // 45% of grMenuDiary as bones
      const vegetablesAmount = grMenuDiary * 0.15; // 15% of grMenuDiary as vegetables
      const higadoAmount = grMenuDiary * 0.05; // 5% of grMenuDiary as liver
      const otrasViscerasAmount = grMenuDiary * 0.05; // 5% of grMenuDiary as other organs

      if (selectedPet.weightUnit === "libras") {
        return {
          grTotal: (grMenuDiary * 0.00220462).toFixed(2) + " lbs",
          meat: (meatAmount * 0.00220462).toFixed(2) + " lbs",
          bones: (bonesAmount * 0.00220462).toFixed(2) + " lbs",
          vegetables: (vegetablesAmount * 0.00220462).toFixed(2) + " lbs",
          higado: (higadoAmount * 0.00220462).toFixed(2) + " lbs",
          visceras: (otrasViscerasAmount * 0.00220462).toFixed(2) + " lbs",
        };
      }

      return {
        grTotal: grMenuDiary.toFixed(0) + " g",
        meat: meatAmount.toFixed(0) + " g",
        bones: bonesAmount.toFixed(0) + " g",
        vegetables: vegetablesAmount.toFixed(0) + " g",
        higado: higadoAmount.toFixed(0) + " g",
        visceras: otrasViscerasAmount.toFixed(0) + " g",
      };

    case "gato":
      let meatPercentagCat = selectedPet.percentage;

      const grMenuDiaryCat = weightInKg * meatPercentagCat * 1000; // Convert weight to grams
      const meatAmountCat = grMenuDiaryCat * 0.3; // 30% of grMenuDiary as meat
      const bonesAmountCat = grMenuDiaryCat * 0.45; // 45% of grMenuDiary as bones
      const vegetablesAmountCat = grMenuDiaryCat * 0.15; // 15% of grMenuDiary as vegetables
      const higadoAmountCat = grMenuDiaryCat * 0.05; // 5% of grMenuDiary as liver
      const otrasViscerasAmountCat = grMenuDiaryCat * 0.05; // 5% of grMenuDiary as other organs

      if (selectedPet.weightUnit === "libras") {
        return {
          grTotal: (grMenuDiaryCat * 0.00220462).toFixed(2) + " lbs",
          meat: (meatAmountCat * 0.00220462).toFixed(2) + " lbs",
          bones: (bonesAmountCat * 0.00220462).toFixed(2) + " lbs",
          vegetables: (vegetablesAmountCat * 0.00220462).toFixed(2) + " lbs",
          higado: (higadoAmountCat * 0.00220462).toFixed(2) + " lbs",
          visceras: (otrasViscerasAmountCat * 0.00220462).toFixed(2) + " lbs",
        };
      }

      return {
        grTotal: grMenuDiaryCat.toFixed(0) + " g",
        meat: meatAmountCat.toFixed(0) + " g",
        bones: bonesAmountCat.toFixed(0) + " g",
        vegetables: vegetablesAmountCat.toFixed(0) + " g",
        higado: higadoAmountCat.toFixed(0) + " g",
        visceras: otrasViscerasAmountCat.toFixed(0) + " g",
      };
      break;
    case "huron":
      let meatPercentagFerret = selectedPet.percentage;

      const grMenuDiaryFerret = weightInKg * meatPercentagFerret * 100; // Porcentaje sugerido para hurones (80%)
      const meatAmountFerret = grMenuDiaryFerret * 0.8; // 80% de grMenuDiaryFerret como carne
      const bonesAmountFerret = grMenuDiaryFerret * 0.1; // 10% de grMenuDiaryFerret como huesos
      const organsAmountFerret = grMenuDiaryFerret * 0.1; // 10% de grMenuDiaryFerret como órganos

      if (selectedPet.weightUnit === "libras") {
        return {
          grTotal: (grMenuDiaryFerret * 0.00220462).toFixed(2) + " lbs",
          meat: (meatAmountFerret * 0.00220462).toFixed(2) + " lbs",
          bones: (bonesAmountFerret * 0.00220462).toFixed(2) + " lbs",
          viscerasHigado: (organsAmountFerret * 0.00220462).toFixed(2) + " lbs",
        };
      }

      return {
        grTotal: grMenuDiaryFerret.toFixed(0) + " g",
        meat: meatAmountFerret.toFixed(0) + " g",
        bones: bonesAmountFerret.toFixed(0) + " g",
        viscerasHigado: organsAmountFerret.toFixed(0) + " g",
      };
      break;
    default:
      return {
        meat: "N/A",
        bones: "N/A",
        vegetables: "N/A",
        higado: "N/A",
        otrasVisceras: "N/A",
      };
  }
}

export async function getAge(date) {
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
