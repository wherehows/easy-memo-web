const fs = require("fs");

const translationsFolder = "./messages/";
const languages = ["zh-cn", "ja", "en"];

interface TranslationObject {
  [key: string]: string | TranslationObject;
}

const koTranslations: TranslationObject = require(`${translationsFolder}ko.json`);

const createFileIfNotExists = (filePath: string): void => {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, "{}");
  }
};

const deepCompareAndTranslation = (origin: any, comp: any, lang: any) => {
  if (typeof comp === "string") {
    return;
  }

  if (typeof origin === "string") {
    return origin;
  }

  if (typeof origin === "object") {
    for (const key of Object.keys(origin)) {
      if (key in comp) {
        deepCompareAndTranslation(origin[key], comp[key], lang);
      } else {
        comp[key] = deepCompareAndTranslation(origin[key], {}, lang);
      }
    }
  }

  return comp;
};

languages.forEach((language) => {
  const languageFile = `${translationsFolder}${language}.json`;

  createFileIfNotExists(languageFile);

  try {
    const existingTranslations: TranslationObject = fs.existsSync(languageFile)
      ? require(languageFile)
      : {};

    const newTranslations = deepCompareAndTranslation(
      koTranslations,
      existingTranslations,
      language
    );

    fs.writeFileSync(languageFile, JSON.stringify(newTranslations, null, 2));
    console.log(`${languageFile} 번역이 완료되었습니다.`);
  } catch (error) {
    console.error(`오류: ${languageFile} 파일을 읽을 수 없습니다.`);
  }
});
