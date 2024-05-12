const cardDataGenerator = (count: number) => {
  const arr1 = Array.from({ length: count }, (_, v: number) => v + 1).map(
    (value) => ({
      id: value,
      value,
    })
  );
  const arr2 = Array.from({ length: count }, (_, v: number) => v + 1).map(
    (value) => ({
      id: value + count,
      value,
    })
  );
  const combinedArray = arr1.concat(arr2);
  shuffleArray(combinedArray);
  return combinedArray;
};

const shuffleArray = (combinedArray: any[]) => {
  for (let i = combinedArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [combinedArray[i], combinedArray[j]] = [combinedArray[j], combinedArray[i]];
  }
};

export default cardDataGenerator;
