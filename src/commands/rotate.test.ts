import { rotateDirection } from './rotate'

describe('function: rotate', () => {
    it('should return NORTH if direction is WEST and rotation is RIGHT', () => {
        expect(rotateDirection('RIGHT', 'WEST')).toBe('NORTH')
    })
    it('should return SOUTH if direction is WEST and rotation is LEFT', () => {
        expect(rotateDirection('LEFT', 'WEST')).toBe('SOUTH')
    })
    it('should return NORTH if direction is EAST and rotation is LEFT', () => {
        expect(rotateDirection('LEFT', 'EAST')).toBe('NORTH')
    })
    it('should return SOUTH if direction is EAST and rotation is RIGHT', () => {
        expect(rotateDirection('RIGHT', 'EAST')).toBe('SOUTH')
    })
    it('should return EAST if direction is NORTH and rotation is RIGHT', () => {
        expect(rotateDirection('RIGHT', 'NORTH')).toBe('EAST')
    })
    it('should return WESTif direction is NORTH and rotation is LEFT', () => {
        expect(rotateDirection('LEFT', 'NORTH')).toBe('WEST')
    })
    it('should return WEST if direction is SOUTH and rotation is RIGHT', () => {
        expect(rotateDirection('RIGHT', 'SOUTH')).toBe('WEST')
    })
    it('should return EAST if direction is SOUTH and rotation is LEFT', () => {
        expect(rotateDirection('LEFT', 'SOUTH')).toBe('EAST')
    })
})

// //
// export function rotateDirection(rotation: 'LEFT' | 'RIGHT', direction: Direction): Direction {
//     const directionArray: Direction[] = ['NORTH', 'EAST', 'SOUTH', 'WEST']
//     const index = directionArray.findIndex((item) => item === direction)
//     if (rotation === 'LEFT') {
//         if (index === 0) return 'WEST'
//         return directionArray[index - 1]
//     } else {
//         if (index === 3) return 'NORTH'
//         return directionArray[index + 1]
//     }
// }
