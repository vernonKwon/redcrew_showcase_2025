import React, { useState, FormEvent, ReactElement } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { LogIn } from 'lucide-react'
import { GetServerSideProps } from 'next'
import { isAuthEnabled } from '@/lib/auth'
import { NextPageWithLayout } from './_app'

const LoginPage: NextPageWithLayout = () => {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        // 로그인 성공 - 홈으로 리다이렉트
        router.push('/')
      } else {
        setError(data.message || '로그인에 실패했습니다.')
      }
    } catch (err) {
      setError('서버와의 통신 중 오류가 발생했습니다.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>로그인 - RED CREW 파이널 쇼케이스</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="login-page">
        <div className="login-container">
          <div className="login-header">
            <h1 className="login-title">RED CREW</h1>
            <p className="login-subtitle">파이널 쇼케이스</p>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            {error && <div className="login-error">{error}</div>}

            <div className="login-form-group">
              <label htmlFor="username" className="login-label">
                아이디
              </label>
              <input
                id="username"
                type="text"
                className="login-input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="아이디를 입력하세요"
                disabled={isLoading}
                required
              />
            </div>

            <div className="login-form-group">
              <label htmlFor="password" className="login-label">
                비밀번호
              </label>
              <input
                id="password"
                type="password"
                className="login-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호를 입력하세요"
                disabled={isLoading}
                required
              />
            </div>

            <button type="submit" className="login-button" disabled={isLoading}>
              {isLoading ? (
                <span>로그인 중...</span>
              ) : (
                <>
                  <LogIn size={20} />
                  <span>로그인</span>
                </>
              )}
            </button>
          </form>

          <div className="login-footer">
            <p className="login-footer-text">
              RED CREW 10th Anniversary Final Showcase
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  // 인증이 비활성화되어 있으면 홈으로 리다이렉트
  if (!isAuthEnabled()) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}

// 레이아웃 없이 페이지만 렌더링
LoginPage.getLayout = (page: ReactElement) => page

export default LoginPage
