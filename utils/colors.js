export const PieChartColors = [
    "#FFCB06",
    "#34A8DF",
    "#FF6F43",
    "#1c8c00",
    "#3d7eff",
    "#ed3942"
  ];
  
  const getColor = index => PieChartColors[index % PieChartColors.length];
  
  export default getColor;