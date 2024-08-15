import { findObiWan } from './index'
import { getRandomNumber, isSamePosition } from './utils/helpers'
import { reportLocation } from './commands/report'
import { listValidCommands } from './commands/listValidCommands'
import { move } from './commands/move'
import { rotateDirection } from './commands/rotate'
import readline from 'readline'

// Mock readline module
jest.mock('readline', () => {
    const mockQuestion = jest.fn((query: string, callback: (input: string) => void) => {
        callback('LAND') // First call returns 'LAND'
    })

    return {
        createInterface: jest.fn(() => ({
            question: mockQuestion,
            close: jest.fn()
        }))
    }
})

const mockGetRandomNumber = jest.fn().mockReturnValue(22)
const mockIsSamePosition = jest.fn().mockReturnValue(true)
jest.mock('./utils/helpers', () => ({
    getRandomNumber: () => mockGetRandomNumber(),
    isSamePosition: () => mockIsSamePosition()
}))

describe('findObiWan()', () => {
    it('should run tests', async () => {
        await findObiWan()

        expect(mockGetRandomNumber).toHaveBeenCalled()
        expect(true).toBe(true)
    })
})
