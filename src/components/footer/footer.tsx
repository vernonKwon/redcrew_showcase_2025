import React from 'react'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="company-info">
          <h2 className="logo">OFFICELAB</h2>
          <p>
            2030 직장인을 위한 스마트한 사무용품 쇼핑몰입니다. 더 나은 워크
            라이프를 위한 여정에 함께하세요.
          </p>
          <div className="social-links">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://via.placeholder.com/24x24?text=IG"
                alt="Instagram"
                className="social-icon"
              />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://via.placeholder.com/24x24?text=FB"
                alt="Facebook"
                className="social-icon"
              />
            </a>
          </div>
        </div>

        <div className="customer-service">
          <h3 className="section-title">고객센터</h3>
          <ul>
            <li>
              <a href="#faq">자주 묻는 질문</a>
            </li>
            <li>
              <a href="#delivery">배송 안내</a>
            </li>
            <li>
              <a href="#exchange">교환/반품</a>
            </li>
            <li>
              <a href="#onetone">1:1 문의</a>
            </li>
          </ul>
        </div>

        <div className="company-details">
          <h3 className="section-title">회사 정보</h3>
          <ul>
            <li>
              <a href="#company-intro">회사 소개</a>
            </li>
            <li>
              <a href="#terms">이용약관</a>
            </li>
            <li>
              <a href="#privacy">개인정보처리방침</a>
            </li>
            <li>
              <a href="#affiliate">제휴 문의</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="copyright">
        <p>&copy; 2024 OFFICELAB. All rights reserved.</p>
        <div className="payment-icons">
          <img src="https://via.placeholder.com/30x20?text=Visa" alt="Visa" />
          <img
            src="https://via.placeholder.com/30x20?text=Master"
            alt="MasterCard"
          />
        </div>
      </div>
    </footer>
  )
}

export default Footer
