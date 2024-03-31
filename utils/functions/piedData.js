
  const graphicInfo = async (selectedPet) => {
    switch (selectedPet) {
      case "perro":
        return [
          {
            color: "#FFB743",
            text: "30%",
            value: 30,
          },
          { color: "#F65454", text: "45%", value: 45 },
          { color: "#3498DB", text: "5%", value: 5 },
          { color: "#6765F8", text: "5%", value: 5 },
          { color: "#1BC760", text: "15%", value: 5 },
        ];
      case "gato":
        return [
          {
            color: "#FFB743",
            text: "30%",
            value: 30,
          },
          { color: "#F65454", text: "45%", value: 45 },
          { color: "#3498DB", text: "5%", value: 15 },
          { color: "#6765F8", text: "5%", value: 5 },
          { color: "#1BC760", text: "15%", value: 5 },
        ];
      case "huron":
        return [
          {
            color: "#FFB743",
            text: "80%",
            value: 80,
          },
          { color: "#F65454", text: "10%", value: 10 },
          { color: "#3498DB", text: "10%", value: 10 },
        ];
      default:
        return "";
    }
  };

  const updateData = async (selectedPet) => {
    const pieDataInfo = await graphicInfo(selectedPet.typePet);
    return pieDataInfo;
  };

export default updateData