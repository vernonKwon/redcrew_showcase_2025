import type { NextApiRequest, NextApiResponse } from 'next'
import { AUTH_COOKIE_NAME, verifyToken } from '@/lib/auth'

type VerifyResponse = {
  authenticated: boolean
  username?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<VerifyResponse>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ authenticated: false })
  }

  try {
    // 쿠키에서 토큰 추출
    const token = req.cookies[AUTH_COOKIE_NAME]

    if (!token) {
      return res.status(401).json({ authenticated: false })
    }

    // 토큰 검증
    const payload = await verifyToken(token)

    if (!payload) {
      return res.status(401).json({ authenticated: false })
    }

    return res.status(200).json({
      authenticated: true,
      username: payload.username,
    })
  } catch (error) {
    return res.status(401).json({ authenticated: false })
  }
}
