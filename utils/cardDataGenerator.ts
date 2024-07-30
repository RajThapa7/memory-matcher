import theOfficeData from "@/data/theOffice";

const cardDataGenerator = (count: number) => {
  const arr1 = Array.from({ length: count }, (_, v: number) => v + 1).map(
    (value) => ({
      value,
      image: theOfficeData[value - 1],
    })
  );
  const combinedArray = arr1.concat(arr1);
  shuffleArray(combinedArray);
  return combinedArray.map((value, index) => ({
    id: index + 1,
    value,
  }));
};

const shuffleArray = (combinedArray: any[]) => {
  for (let i = combinedArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [combinedArray[i], combinedArray[j]] = [combinedArray[j], combinedArray[i]];
  }
};

export default cardDataGenerator;
