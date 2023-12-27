import colors from "tailwindcss/colors";

export default function getColor(rating: string) {
  const SHADE = 400;


  if (rating === 'NA') {
    return colors.gray[SHADE];
  }
  const toInt = parseInt(rating, 10);
  if (toInt <= 1) {
    return colors.red[SHADE];
  }
  if (toInt <= 2) {
    return colors.purple[SHADE];
  }
  if (toInt <= 3) {
    return colors.orange[SHADE];
  }
  if (toInt <= 4) {
    return colors.yellow[SHADE];
  }
  return colors.green[SHADE];
}
