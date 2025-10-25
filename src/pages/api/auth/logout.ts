import type { NextApiRequest, NextApiResponse } from 'next'
import { clearAuthCookie } from '@/lib/auth'

type LogoutResponse = {
  success: boolean
  message: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<LogoutResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: '허용되지 않은 메서드입니다.' })
  }

  try {
    // 인증 쿠키 삭제
    clearAuthCookie(res)

    return res.status(200).json({
      success: true,
      message: '로그아웃되었습니다.',
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: '서버 오류가 발생했습니다.',
    })
  }
}
