import { getReadyResizedImageFilepath } from "../src/utils/image-processing";
import { checkIfFileExist } from "../src/utils/commons";

test("image can be resized", async () => {
  const resizedFilepath = await getReadyResizedImageFilepath("fjord", 100, 100);
  expect(resizedFilepath).toEqual(
    expect.stringMatching(/fjord_w100_h100.jpg$/)
  );
  const fileExist = await checkIfFileExist(resizedFilepath);
  expect(fileExist).toBeTruthy();
});

test("non-existent source image throw error", async () => {
  try {
    await getReadyResizedImageFilepath("abc", 100, 100);
  } catch (error) {
    expect(error.message).toEqual("Source image does not exist");
  }
});
