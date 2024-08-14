import { Coordinate, Direction } from '..'
import { reportLocation } from './report'

describe('function: reportLocation', () => {
    const mockedr2D2Position: Coordinate = [13, 15]
    const mockedR2d2Direction: Direction = 'WEST'
    const mockedObiWanPosition: Coordinate = [41, 22]
    it('should call console.log containing r2d2Position and r2D2direction, and ObiwanPosition', () => {
        const logSpy = jest.spyOn(console, 'log')
        reportLocation(mockedr2D2Position, mockedR2d2Direction, mockedObiWanPosition)
        console.log(logSpy.mock.calls)
        expect(logSpy.mock.calls[0][1]).toBe(mockedr2D2Position)
        expect(logSpy.mock.calls[0][2]).toContain(mockedR2d2Direction)
        expect(logSpy.mock.calls[1][1]).toBe(mockedObiWanPosition)
    })
})
