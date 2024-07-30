import fs from "fs";
import path from "path";

const bulkDataImporter = async () => {
  const imagesDirectory = path.join(process.cwd(), "public", "office");

  const filenames = fs.readdirSync(imagesDirectory);
  return filenames;
};

export default bulkDataImporter;
