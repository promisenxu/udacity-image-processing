import sharp from 'sharp';
import path from 'path';
import { checkIfFileExist } from './commons';

const FILE_EXTENSION = '.jpg';
const SOURCE_IMAGES_FOLDER = '../images/source';
const CACHE_IMAGES_FOLDER = '../images/cache';

const getSourceImageFilepath = (fileNameWithoutExtension: string) => {
    return path.join(
        __dirname,
        SOURCE_IMAGES_FOLDER,
        `${fileNameWithoutExtension}${FILE_EXTENSION}`
    );
};

const getResizedImageCacheFilepath = (
    fileNameWithoutExtension: string,
    width?: number,
    height?: number
) => {
    return path.join(
        __dirname,
        CACHE_IMAGES_FOLDER,
        `${fileNameWithoutExtension}_w${width || 'default'}_h${height ||
            'default'}${FILE_EXTENSION}`
    );
};

const resizeImageToFilepath = async (
    sourceFilepath: string,
    destinationFilepath: string,
    width?: number,
    height?: number
) => {
    await sharp(sourceFilepath)
        .resize(width, height)
        .toFile(destinationFilepath);
};

export const getReadyResizedImageFilepath = async (
    fileNameWithoutExtension: string,
    width?: number,
    height?: number
) => {
    const sourceFilepath = getSourceImageFilepath(fileNameWithoutExtension);
    const doesSourceExist = await checkIfFileExist(sourceFilepath);
    if (!doesSourceExist) {
        throw new Error('Source image does not exist');
    }

    const cacheFilepath = getResizedImageCacheFilepath(
        fileNameWithoutExtension,
        width,
        height
    );
    const doesCacheVersionExist = await checkIfFileExist(cacheFilepath);

    // If a cache version doesn't exist, create one
    if (!doesCacheVersionExist) {
        await resizeImageToFilepath(
            sourceFilepath,
            cacheFilepath,
            width,
            height
        );
    }
    return cacheFilepath;
};
