import { SignJWT, jwtVerify } from 'jose'
import { NextApiResponse } from 'next'

// 하드코딩된 사용자 정보
export const CREDENTIALS = {
  username: 'redcrew',
  password: 'redcrew2025!',
}

// JWT 시크릿 키 (환경변수 또는 기본값)
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'redcrew-showcase-secret-key-2025'
)

// 쿠키 이름
export const AUTH_COOKIE_NAME = 'redcrew-auth-token'

// 토큰 만료 시간 (10분)
const TOKEN_EXPIRY = 10 * 60 // 10 minutes in seconds

/**
 * 인증 기능 활성화 여부 체크
 * 환경변수 ENABLE_AUTH가 'true'일 때만 인증 활성화
 */
export function isAuthEnabled(): boolean {
  return process.env.ENABLE_AUTH === 'true'
}

/**
 * JWT 토큰 생성
 */
export async function generateToken(username: string): Promise<string> {
  const token = await new SignJWT({ username })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${TOKEN_EXPIRY}s`)
    .sign(JWT_SECRET)

  return token
}

/**
 * JWT 토큰 검증
 */
export async function verifyToken(token: string): Promise<{ username: string } | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    return payload as { username: string }
  } catch (error) {
    return null
  }
}

/**
 * 인증 쿠키 설정
 */
export function setAuthCookie(res: NextApiResponse, token: string) {
  res.setHeader(
    'Set-Cookie',
    `${AUTH_COOKIE_NAME}=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${TOKEN_EXPIRY}${
      process.env.NODE_ENV === 'production' ? '; Secure' : ''
    }`
  )
}

/**
 * 인증 쿠키 삭제
 */
export function clearAuthCookie(res: NextApiResponse) {
  res.setHeader(
    'Set-Cookie',
    `${AUTH_COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0`
  )
}

/**
 * 사용자 인증 검증
 */
export function validateCredentials(username: string, password: string): boolean {
  return username === CREDENTIALS.username && password === CREDENTIALS.password
}
