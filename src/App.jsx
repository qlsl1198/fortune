import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import TestPage from './TestPage'
import ResultPage from './ResultPage'
import FortunePage from './FortunePage'
import TarotPage from './TarotPage'

function Home() {
  return (
    <div className="main-container">
      <div className="hero-section">
        <h1>나의 숨겨진 성격 유형 찾기</h1>
        <p className="subtitle">MBTI보다 더 정확한 성격 유형 테스트</p>
      </div>

      <div className="stats">
        <div className="stat-item">
          <div className="stat-number">10만+</div>
          <div className="stat-label">참여자</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">98%</div>
          <div className="stat-label">정확도</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">7</div>
          <div className="stat-label">질문</div>
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
        <div style={{background:'#eee', padding:'16px', textAlign:'center', borderRadius:'8px'}}>
          광고 배너 자리
        </div>
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
