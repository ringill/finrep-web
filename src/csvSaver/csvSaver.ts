import { save } from "./csvSaver";

describe('App', () => {
  it('Get table from parsed file', () => {
    const table = parse("test.pdf");
    expect(table).not.toBeUndefined();
  })
});