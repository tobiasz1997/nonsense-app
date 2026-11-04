import generateRegon from '@utils/generators/regonGenerator';

describe('REGON Generator', () => {
	test('Should create correct REGON with length equal 7', () => {
		const regon = generateRegon('short');

		expect(regon.result).not.toBeNull();
		expect(regon.result).toHaveLength(7);
		expect(typeof regon.result).toBe('string');
	});

	test('Should create correct REGON with length equal 9', () => {
		const regon = generateRegon();

		expect(regon.result).not.toBeNull();
		expect(regon.result).toHaveLength(9);
		expect(typeof regon.result).toBe('string');
	});
});
