import { getMessage } from './index'

describe('getMessage()', () => {
    it('should return the correct message when called', () => {
        expect(getMessage()).toBe('running!')
    })

    it('should be super smart', () => {
        expect(true).toBe(true)
    })
})
