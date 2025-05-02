// Exemple de test unitaire.
import { exampleFunction } from '../src/controllers/exampleController';

test('exampleFunction should return a response', () => {
    const req = {};
    const res = { send: jest.fn() };
    exampleFunction(req, res);
    expect(res.send).toHaveBeenCalledWith('Hello from the controller!');
});
