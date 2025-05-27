import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import TestPage from './TestPage'
import ResultPage from './ResultPage'
import FortunePage from './FortunePage'
import TarotPage from './TarotPage'
import { useState, useEffect } from 'react'

function Home() {
  const [isAdLoaded, setIsAdLoaded] = useState(false)

  useEffect(() => {
    const loadKakaoAdFit = () => {
      try {
        const script = document.createElement('script')
        script.src = 'https://t1.daumcdn.net/kas/static/ads/custom_ads.js'
        script.async = true
        script.onload = () => {
          setIsAdLoaded(true)
          if (window.kakaoAdfit) {
            window.kakaoAdfit.refresh()
          }
        }
        script.onerror = () => {
          console.error('광고 스크립트 로딩 실패')
        }
        document.head.appendChild(script)
      } catch (error) {
        console.error('광고 스크립트 로딩 중 에러:', error)
      }
    }

    // 페이지 로드 후 약간의 지연을 두고 광고 스크립트 로드
    const timer = setTimeout(() => {
      loadKakaoAdFit()
    }, 1000)

    return () => {
      clearTimeout(timer)
      // 컴포넌트 언마운트 시 광고 스크립트 제거
      const adScript = document.querySelector('script[src*="custom_ads.js"]')
      if (adScript) {
        adScript.remove()
      }
    }
  }, [])

  return (
    <div className="main-container">
      <div className="hero-section">
        <h1>나의 숨겨진 성격 유형 찾기</h1>
        <p className="subtitle">MBTI보다 더 정확한 성격 유형 테스트</p>
      </div>

      <div className="stats">
        <div className="stat-item">
          <div className="stat-number">🎯</div>
          <div className="stat-label">성격 분석</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">✨</div>
          <div className="stat-label">운세 보기</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">🎴</div>
          <div className="stat-label">타로 점</div>
        </div>
      </div>

      <div className="features">
        <div className="feature-item">
          <div className="feature-icon">🎯</div>
          <div className="feature-text">정확한 분석</div>
        </div>
        <div className="feature-item">
          <div className="feature-icon">⚡</div>
          <div className="feature-text">2분 소요</div>
        </div>
        <div className="feature-item">
          <div className="feature-icon">🎁</div>
          <div className="feature-text">무료 이용</div>
        </div>
      </div>

      <div className="menu-buttons">
        <Link to="/test" className="start-button">
          <button>성격 유형 테스트 시작하기</button>
        </Link>
        <Link to="/fortune">
          <button>오늘의 운세 보기</button>
        </Link>
        <Link to="/tarot">
          <button>타로 카드 뽑기</button>
        </Link>
      </div>

      <div className="ad-banner">
        <ins 
          className="kakao_ad_area" 
          style={{ display: 'block', width: '100%', textAlign: 'center' }}
          data-ad-unit="DAN-rz0SXdqQnXMRUyny"
          data-ad-width="320"
          data-ad-height="100"
        />
      </div>

      <div className="footer">
        <p>이 테스트는 재미로 보는 심리테스트입니다.</p>
        <p>결과는 참고용으로만 활용해주세요.</p>
      </div>
    </div>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/fortune" element={<FortunePage />} />
        <Route path="/tarot" element={<TarotPage />} />
      </Routes>
    </Router>
  )
}

export default App
