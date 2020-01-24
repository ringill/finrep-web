import pdfreader from 'pdfreader';

const nbCols = 2;
const cellPadding = 40; // each cell is padded to fit 40 characters
const columnQuantitizer = (item: any) => parseFloat(item.x) >= 20;

const padColumns = (array: { [x: string]: any; }, nb: number) =>
  Array.apply(null, { length: nb }).map((val: any, i: string | number) => array[i] || []);
// .. because map() skips undefined elements

const mergeCells = (cells: any) => (cells || [])
  .map((cell: { text: any; }) => cell.text).join('') // merge cells
  .substr(0, cellPadding).padEnd(cellPadding, ' '); // padding

const renderMatrix = (matrix: any) => (matrix || [])
  .map((row: any, y: any) => padColumns(row, nbCols)
    .map(mergeCells)
    .join(' | ')
  ).join('\n');

export const parse = (filename: string) => {
  let table = new pdfreader.TableParser();

  new pdfreader.PdfReader().parseFileItems(filename, (err: any, item: { page: any; text: any; }) => {
    if (!item || item.page) {
      // end of file, or page
      console.log(renderMatrix(table.getMatrix()));
      console.log('PAGE:', item.page);
      table = new pdfreader.TableParser(); // new/clear table for next page
    } else if (item.text) {
      // accumulate text items into rows object, per line
      table.processItem(item, columnQuantitizer(item));
    }
  });

  return table;
};