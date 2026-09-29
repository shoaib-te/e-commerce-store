import { afterEach, beforeEach, describe, expect, jest, test } from '@jest/globals'
import jwt from 'jsonwebtoken'
import authuser from './auth.js'

const originalSecret = process.env.JWT_SECRET_KEY

const createResponse = () => ({
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
})

beforeEach(() => {
  process.env.JWT_SECRET_KEY = 'test-secret'
})

afterEach(() => {
  if (originalSecret === undefined) {
    delete process.env.JWT_SECRET_KEY
  } else {
    process.env.JWT_SECRET_KEY = originalSecret
  }
})

describe('authuser middleware', () => {
  test('accepts a Bearer token and attaches the user id', () => {
    const token = jwt.sign({ id: 'user-123' }, process.env.JWT_SECRET_KEY)
    const req = { headers: { authorization: `Bearer ${token}` } }
    const res = createResponse()
    const next = jest.fn()

    authuser(req, res, next)

    expect(req.user).toEqual({ id: 'user-123' })
    expect(next).toHaveBeenCalledTimes(1)
    expect(res.status).not.toHaveBeenCalled()
  })

  test('rejects a request without a token', () => {
    const req = { headers: {} }
    const res = createResponse()
    const next = jest.fn()

    authuser(req, res, next)

    expect(res.status).toHaveBeenCalledWith(401)
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: 'token is required',
    })
    expect(next).not.toHaveBeenCalled()
  })
})