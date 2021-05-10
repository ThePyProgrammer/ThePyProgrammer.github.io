// Source: https://www.freecodecamp.org/news/how-to-more-accurately-estimate-read-time-for-medium-articles-in-javascript-fb563ff0282a/

import { strip } from "../helpers/strip.js"


const WORDS_PER_MIN = 200; // wpm

const IMAGE_READ_TIME = 12; // in seconds

const IMAGE_TAGS = ['img', 'Image'];

function imageCount(imageTags, string) {
  const combinedImageTags = imageTags.join('|');
  const pattern = `<(${combinedImageTags})([\\w\\W]+?)[\\/]?>`;
  const reg = new RegExp(pattern, 'g');
  return (string.match(reg) || []).length;
}

function imageReadTime(customImageTime = IMAGE_READ_TIME, tags = IMAGE_TAGS, string) {
  let seconds = 0;
  const count = imageCount(tags, string);

  if (count > 10) {
    seconds = ((count / 2) * (customImageTime + 3)) + (count - 10) * 3; // n/2(a+b) + 3 sec/image
  } else {
    seconds = (count / 2) * (2 * customImageTime + (1 - count)); // n/2[2a+(n-1)d]
  }
  return {
    time: seconds / 60,
    count,
  };
}

function wordsCount(string) {
  const reg = /[\w\d\’\'-]+/gi;
  return (string.match(reg) || []).length;


  function wordsReadTime(string, wordsPerMin = WORDS_PER_MIN) {
    const wordCount = wordsCount(string);
    const wordTime = wordCount / wordsPerMin;
    return {
      wordTime,
      wordCount,
    };
  }

function humanizeTime(time) {
  if (time < 0.5) {
    return 'less than a minute';
  } if (time >= 0.5 && time < 1.5) {
    return '1 minute';
  }
  return `${Math.ceil(time)} minutes`;
}

function readTime(
  string,
  customWordTime = WORDS_PER_MIN,
  customImageTime = IMAGE_READ_TIME,
  imageTags = IMAGE_TAGS,
) {
  const { time: imageTime, count: imageCount } = imageReadTime(customImageTime, imageTags, string);
  const strippedString = strip(string);
  const {
    wordTime,
    wordCount,
  } = wordsReadTime(strippedString, customWordTime);
  return {
    humanizedDuration: humanizeTime(imageTime + wordTime),
    duration: imageTime + wordTime,
    totalWords: wordCount,
    wordTime,
    totalImages: imageCount,
    imageTime,
  };
}
