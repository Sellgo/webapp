import { returnWithRenderMethod } from '../tableColumn';

const columnsWithoutRender = [
  {
    dataKey: 'id',
    label: 'id',
    extraDetails: {},
  },
];

const columnsWithRender = [
  {
    dataKey: 'id',
    label: 'id',
    render: jest.fn(),
  },
  {
    dataKey: 'name',
    label: 'name',
    render: jest.fn(),
  },
];
/* Testing table columns utility */
describe('Testing return with render method', () => {
  test('Testing with empty columns state', () => {
    expect(returnWithRenderMethod([], [])).toEqual([]);
  });

  test('Testing with data', () => {
    const result = [{ dataKey: 'id', label: 'id', extraDetails: {}, render: jest.fn() }];
    expect(JSON.stringify(returnWithRenderMethod(columnsWithRender, columnsWithoutRender))).toEqual(
      JSON.stringify(result)
    );
  });
});
