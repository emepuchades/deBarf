
  const graphicInfo = async (selectedPet) => {
    switch (selectedPet) {
      case "perro":
        return [
          {
            color: "#ffca3a",
            text: "30%",
            value: 30,
          },
          { color: "#ff595e", text: "45%", value: 45 },
          { color: "#3498DB", text: "5%", value: 5 },
          { color: "#9D71E8", text: "5%", value: 5 },
          { color: "#8ac926", text: "15%", value: 5 },
        ];
      case "gato":
        return [
          {
            color: "#ffca3a",
            text: "30%",
            value: 30,
          },
          { color: "#ff595e", text: "45%", value: 45 },
          { color: "#3498DB", text: "5%", value: 15 },
          { color: "#9D71E8", text: "5%", value: 5 },
          { color: "#8ac926", text: "15%", value: 5 },
        ];
      case "huron":
        return [
          {
            color: "#ffca3a",
            text: "80%",
            value: 80,
          },
          { color: "#ff595e", text: "10%", value: 10 },
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