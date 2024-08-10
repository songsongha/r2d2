import { Coordinate } from '..'
import { move } from './move'

describe('function: move', () => {
    const mockedPosition: Coordinate = [13, 15]
    const mockedDistance = 10
    it('should return the correct position if direction is NORTH', () => {
        expect(move(mockedDistance, mockedPosition, 'NORTH')).toStrictEqual([13, 25])
    })
    it('should return the correct position if direction is EAST', () => {
        expect(move(mockedDistance, mockedPosition, 'EAST')).toStrictEqual([23, 15])
    })
    it('should return the correct position if direction is SOUTH', () => {
        expect(move(mockedDistance, mockedPosition, 'SOUTH')).toStrictEqual([13, 5])
    })
    it('should return the correct position if direction is WEST', () => {
        expect(move(mockedDistance, mockedPosition, 'WEST')).toStrictEqual([3, 15])
    })
    it('should return the correct position if direction is a negative number', () => {
        expect(move(-10, mockedPosition, 'WEST')).toStrictEqual([23, 15])
    })
    it('should return the same input position and display "Invalid move" if distance is outside of the 100 x 100 grid', () => {
        const logSpy = jest.spyOn(console, 'log')
        expect(move(100, mockedPosition, 'WEST')).toStrictEqual(mockedPosition)
        expect(logSpy.mock.calls[0][1]).toBe('Invalid move')
    })
})
