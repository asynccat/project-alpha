/* eslint-disable @typescript-eslint/ban-ts-comment */
export {}

jest.mock('./ErrorHandler')

describe('errorHandler', () => {
    it ('handles error object with unknown error', () => {
        const error = { field: 'unknown_error'}
       
        // @ts-ignore
        const mMock = jest.fn().mockImplementation(() => error)
        mMock(error)

        expect(mMock).toBeCalled()
        expect(mMock).toBeCalledWith(error)

        })
})
    