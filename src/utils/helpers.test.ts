import { Coordinate } from '..'
import { isSamePosition, getRandomNumber } from './helpers'

describe('function: isSamePosition', () => {
    const coord1: Coordinate = [13, 15]
    const coord2: Coordinate = [13, 22]
    const coord3: Coordinate = [4, 15]
    it('should return false if the x values are the same but y values are different', () => {
        const result = isSamePosition(coord1, coord2)
    })
    it('should return false if the y values are the same but x values are different', () => {
        const result = isSamePosition(coord1, coord3)
    })
    it('should return true if both the x and y values are the same', () => {
        const result = isSamePosition(coord1, coord1)
    })
})

describe('function: getRandomNumber', () => {
    it('should return a number', () => {
        const result = getRandomNumber()
        expect(typeof result).toBe('number')
    })

    it('should return a number between 0 and 99 (inclusive)', () => {
        const result = getRandomNumber()
        expect(result).toBeGreaterThanOrEqual(0)
        expect(result).toBeLessThanOrEqual(100)
    })
})
