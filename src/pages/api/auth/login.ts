import type { NextApiRequest, NextApiResponse } from 'next'
import {
  validateCredentials,
  generateToken,
  setAuthCookie,
} from '@/lib/auth'

type LoginRequest = {
  username: string
  password: string
}

type LoginResponse = {
  success: boolean
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<LoginResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: '허용되지 않은 메서드입니다.' })
  }

  try {
    const { username, password } = req.body as LoginRequest

    // 입력값 검증
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: '아이디와 비밀번호를 입력해주세요.',
      })
    }

    // 사용자 인증
    if (!validateCredentials(username, password)) {
      return res.status(401).json({
        success: false,
        message: '아이디 또는 비밀번호가 올바르지 않습니다.',
      })
    }

    // JWT 토큰 생성
    const token = await generateToken(username)

    // 쿠키 설정
    setAuthCookie(res, token)

    return res.status(200).json({
      success: true,
      message: '로그인에 성공했습니다.',
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: '서버 오류가 발생했습니다.',
    })
  }
}
