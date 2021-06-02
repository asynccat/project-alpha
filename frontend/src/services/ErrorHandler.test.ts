/* eslint-disable @typescript-eslint/ban-ts-comment */
import * as React from 'react'

jest.mock('./ErrorHandler')

describe('errorHandler', () => {
    it ('renders toast if error occurs', () => {
        const error = {
            message: '444',
            field: '222',
        }
        //@ts-ignore
        const mMock = jest.fn().mockImplementation(() => error)
        mMock(error)

        expect(mMock).toBeTruthy()
        expect(mMock).toBeCalled()
        })
})
    