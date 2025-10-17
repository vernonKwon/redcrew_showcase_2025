import { ReactElement } from 'react'
import type { NextPageWithLayout } from '@/pages/_app'
import EmptyLayout from '@/components/layout/EmptyLayout'
import Link from 'next/link'
import { Button } from 'antd'
import { HomeOutlined, SearchOutlined } from '@ant-design/icons'

const Custom404: NextPageWithLayout = () => {
  return (
    <div className="error-404">
      <div className="error-404-container">
        <div className="cat-container">
          <div className="cat">
            <div className="cat-head">
              <div className="cat-ears">
                <div className="ear ear-left"></div>
                <div className="ear ear-right"></div>
              </div>
              <div className="cat-face">
                <div className="cat-eyes">
                  <div className="eye left-eye">
                    <div className="pupil"></div>
                  </div>
                  <div className="eye right-eye">
                    <div className="pupil"></div>
                  </div>
                </div>
                <div className="cat-nose"></div>
                <div className="nose-line"></div>
                <div className="cat-mouth">
                  <div className="mouth-left"></div>
                  <div className="mouth-right"></div>
                </div>
                <div className="cat-whiskers">
                  <div className="whisker whisker-left-1"></div>
                  <div className="whisker whisker-left-2"></div>
                  <div className="whisker whisker-right-1"></div>
                  <div className="whisker whisker-right-2"></div>
                </div>
              </div>
            </div>
            <div className="cat-body">
              <div className="cat-arm arm-left">
                <div className="paw-front">
                  <div className="toe"></div>
                  <div className="toe"></div>
                  <div className="toe"></div>
                  <div className="main-pad"></div>
                </div>
              </div>
              <div className="cat-arm arm-right">
                <div className="paw-front">
                  <div className="toe"></div>
                  <div className="toe"></div>
                  <div className="toe"></div>
                  <div className="main-pad"></div>
                </div>
              </div>
              <div className="cat-paw paw-left">
                <div className="paw-pad"></div>
              </div>
              <div className="cat-paw paw-right">
                <div className="paw-pad"></div>
              </div>
            </div>
            <div className="cat-tail"></div>
          </div>
        </div>

        <div className="error-404-number">
          <span className="four">4</span>
          <span className="zero">
            <div className="paw-print">
              <div className="pad main-pad"></div>
              <div className="pad toe-1"></div>
              <div className="pad toe-2"></div>
              <div className="pad toe-3"></div>
              <div className="pad toe-4"></div>
            </div>
          </span>
          <span className="four">4</span>
        </div>
        
        <h1 className="error-404-title">냥? 페이지를 찾을 수 없다냥!</h1>
        <p className="error-404-message">
          이 고양이가 페이지를 어디다 숨겨놨나봐요... 🐾
          <br />
          함께 다시 찾아볼까요?
        </p>

        <div className="floating-items">
          <div className="item yarn-ball">🧶</div>
          <div className="item fish">🐟</div>
          <div className="item heart">💕</div>
          <div className="item star">✨</div>
          <div className="item paw">🐾</div>
        </div>
        
        <div className="error-404-actions">
          <Link href="/">
            <Button type="primary" size="large" icon={<HomeOutlined />} className="btn-home">
              집으로 돌아가기 🏠
            </Button>
          </Link>
          <Link href="/search">
            <Button size="large" icon={<SearchOutlined />} className="btn-search">
              다시 찾아보기 🔍
            </Button>
          </Link>
        </div>

        <div className="cat-toys">
          <div className="toy toy-1">
            <div className="string"></div>
            <div className="ball">🔵</div>
          </div>
          <div className="toy toy-2">
            <div className="mouse">🐭</div>
          </div>
        </div>

        <div className="speech-bubble">
          <span>미야옹~</span>
        </div>
      </div>
    </div>
  )
}

Custom404.getLayout = function getLayout(page: ReactElement) {
  return <EmptyLayout>{page}</EmptyLayout>
}

export default Custom404