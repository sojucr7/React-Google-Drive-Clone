const originalModule = jest.requireActual('react-router-dom');
module.exports = {
  __esModule: true,
  ...originalModule,
  useParams: jest.fn()
}