import colors from "tailwindcss/colors";

export default function getColor(rating: string) {
  if (rating === 'NA') {
    return colors.gray[300];
  }
  const toInt = parseInt(rating, 10);
  return colors.green[toInt * 100 as unknown as keyof typeof colors.green];
}
