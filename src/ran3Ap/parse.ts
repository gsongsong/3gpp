import * as $ from 'cheerio';
import { readFile } from 'fs';

interface ISectionInfo {
  sectionNumber: string;
  sectionTitle: string;
}

const headerTitles = [
  'ie/group name',
  'presence',
  'range',
  'ie type and reference',
  'semantics description',
];

export function parse(html: string): any {
  let sectionNumber: string = null;
  let sectionTitle: string = null;
  let direction: string = null;

  let stack = selectorToArray($(html)).reverse();
  while (stack.length) {
    const selector = stack.pop();
    const elem = selector[0];
    //  TODO
    if (isTagHeading(elem)) {
      ({sectionNumber, sectionTitle} = sectionInformation(selector));
      direction = null;
      continue;
    }
    if (containsDirection(selector)) {
      direction = getDirection(selector);
      continue;
    }
    if (isMsgIeTable(selector)) {
    stack = stackChildren(stack, selector);
  }
}

function isTag(elem: CheerioElement): boolean {
  return elem.type === 'tag';
}

function isTagHeading(elem: CheerioElement): boolean {
  return isTag(elem) && ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].indexOf(elem.name) !== -1;
}

function sectionInformation(selector: Cheerio): ISectionInfo {
  const sectionHeading = normalizeWhitespace(selector.text());
  const indexDelimiter = sectionHeading.indexOf(' ');
  const sectionNumber = sectionHeading.substring(0, indexDelimiter);
  const sectionTitle = sectionHeading.substring(indexDelimiter + 1);
  return {sectionNumber, sectionTitle};
}

function containsDirection(selector: Cheerio): boolean {
  return normalizeWhitespace(selector.text()).startsWith('Direction:');
}

function getDirection(selector: Cheerio): string {
  // MS Word converts rightwards arrow to \u00AE (REGISTERED SIGN)
  return normalizeWhitespace(selector.text()).replace(/®/g, '→');
}

function isMsgIeTable(selector: Cheerio): boolean {
  const elem = selector[0];
  if (!isTag(elem) || elem.name !== 'table') {
    return false;
  }
  const headerTds = selector.find('tr').first().children('td').slice(0, 5);
  return headerTds.get().reduce((prev: boolean, curr: any, currIndex: number, arr: any[]) => {
    return prev && (normalizeWhitespace($(curr).text()).toLowerCase() === headerTitles[currIndex]);
  }, true);
}

function selectorToArray(selector: Cheerio): Cheerio[] {
  return selector.map((index, elem) => {
    return $(elem);
  }).get();
}

function stackChildren(stack: Cheerio[], selector: Cheerio): Cheerio[] {
  const children: Cheerio[] = selector.children().map((index, child) => {
    return $(child);
  }).get();
  return stack.concat(children.reverse());
}

function normalizeWhitespace(text: string): string {
  return text.trim().replace(/\s+/g, ' ');
}

if (require.main === module) {
  const filePath = process.argv[2];
  if (!filePath) {
    throw Error('Requires 1 argument, filePath');
  }
  readFile(filePath, 'utf8', (err: Error, html: string) => {
    if (err) {
      throw err;
    }
    process.stdout.write(JSON.stringify(parse(html), null, 2));
  });
}