import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'redcrew-showcase-secret-key-2025'
)

const AUTH_COOKIE_NAME = 'redcrew-auth-token'

export async function middleware(request: NextRequest) {
  // 인증 기능이 비활성화된 경우 인증 체크 건너뛰기
  if (process.env.ENABLE_AUTH !== 'true') {
    return NextResponse.next()
  }

  const { pathname } = request.nextUrl

  // 로그인 페이지와 API 라우트는 인증 체크 제외
  if (
    pathname.startsWith('/login') ||
    pathname.startsWith('/api/auth/') ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/static/')
  ) {
    return NextResponse.next()
  }

  // 쿠키에서 토큰 가져오기
  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value

  // 토큰이 없으면 로그인 페이지로 리다이렉트
  if (!token) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  try {
    // 토큰 검증
    await jwtVerify(token, JWT_SECRET)
    return NextResponse.next()
  } catch (error) {
    // 토큰이 유효하지 않으면 로그인 페이지로 리다이렉트
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }
}

// 미들웨어를 적용할 경로 설정
export const config = {
  matcher: [
    /*
     * 다음을 제외한 모든 경로에 매칭:
     * - api (API routes)
     * - _next/static (정적 파일)
     * - _next/image (이미지 최적화 파일)
     * - favicon.ico (파비콘)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
