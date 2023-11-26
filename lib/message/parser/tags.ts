import { IRCMessageTags } from "../irc/tags";

const decodeMap: Record<string, string> = {
  "\\\\": "\\",
  "\\:": ";",
  "\\s": " ",
  "\\n": "\n",
  "\\r": "\r",
  "\\": "", // remove invalid backslashes
};

const decodeLookupRegex = /\\\\|\\:|\\s|\\n|\\r|\\/g;

export function decodeValue(value: string) {
  return value.replace(decodeLookupRegex, (m) => decodeMap[m] || "");
}

export function parseTags(tagsSrc: string | undefined): IRCMessageTags {
  const tags: IRCMessageTags = {};

  if (tagsSrc == null) {
    return tags;
  }

  for (const tagSrc of tagsSrc.split(";")) {
    const keyValueDelimiter: number = tagSrc.indexOf("=");

    // ">>>" turns any negative `keyValueDelimiter` into the max uint32, so we get the entire tagSrc for the key.
    const key = tagSrc.slice(0, keyValueDelimiter >>> 0);

    // if there's no = in tagSrc, valueSrc's null
    let valueSrc: string | null = null;
    if (keyValueDelimiter !== -1) {
      valueSrc = decodeValue(tagSrc.slice(keyValueDelimiter + 1));
    }

    tags[key] = valueSrc;
  }

  return tags;
}
