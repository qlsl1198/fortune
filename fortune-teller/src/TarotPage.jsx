import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const tarotCards = [
  {
    name: '🌞 The Sun',
    meaning: '성공, 행복, 긍정적인 변화를 의미합니다. 당신의 노력이 결실을 맺을 때입니다.',
    advice: ['자신감을 가지세요', '목표를 향해 전진하세요', '긍정적인 마인드를 유지하세요'],
    timing: ['현재: 매우 좋은 시기', '가까운 미래: 계속되는 성공', '장기적: 지속적인 발전'],
    areas: ['사업/직업: 성공과 승진', '사랑: 행복한 관계', '건강: 활력과 에너지']
  },
  {
    name: '🌙 The Moon',
    meaning: '직관, 영감, 잠재의식을 의미합니다. 당신의 내면의 목소리에 귀를 기울일 때입니다.',
    advice: ['직관을 믿으세요', '내면의 목소리를 들어보세요', '창의력을 발휘하세요'],
    timing: ['현재: 내면 성찰의 시기', '가까운 미래: 새로운 통찰', '장기적: 영적 성장'],
    areas: ['사업/직업: 창의적 접근', '사랑: 깊은 이해', '건강: 정신적 균형']
  },
  {
    name: '⭐ The Star',
    meaning: '희망, 영감, 새로운 시작을 의미합니다. 당신의 꿈을 향해 나아갈 때입니다.',
    advice: ['희망을 잃지 마세요', '새로운 시작을 두려워하지 마세요', '꿈을 향해 나아가세요'],
    timing: ['현재: 새로운 시작', '가까운 미래: 희망찬 변화', '장기적: 꿈의 실현'],
    areas: ['사업/직업: 새로운 기회', '사랑: 새로운 관계', '건강: 회복과 치유']
  },
  {
    name: '💫 Wheel of Fortune',
    meaning: 'Change, cycles, and destiny. Embrace life\'s changes.',
    advice: ['Accept change', 'Be flexible', 'Seize new opportunities'],
    timing: ['Present: Time of change', 'Near future: New phase', 'Long term: Cyclical growth'],
    areas: ['Career: Change and opportunity', 'Love: Relationship changes', 'Health: New beginnings']
  },
  {
    name: '🌿 The High Priestess',
    meaning: 'Wisdom, intuition, and inner knowledge. Trust your inner wisdom.',
    advice: ['Trust your inner wisdom', 'Make calm judgments', 'Follow your intuition'],
    timing: ['Present: Time for reflection', 'Near future: Insights', 'Long term: Wisdom accumulation'],
    areas: ['Career: Wise decisions', 'Love: Deep understanding', 'Health: Balance and harmony']
  },
  {
    name: '⚔️ The Sword',
    meaning: 'Decision, action, and change. Make clear decisions.',
    advice: ['Make decisions', 'Take action', 'Don\'t fear change'],
    timing: ['Present: Time for decisions', 'Near future: Results of action', 'Long term: Goal achievement'],
    areas: ['Career: Decisive action', 'Love: Clear choices', 'Health: New beginnings']
  }
]

export default function TarotPage() {
  const [selectedCards, setSelectedCards] = useState([])
  const [showResults, setShowResults] = useState(false)
  const [isDrawing, setIsDrawing] = useState(false)
  const navigate = useNavigate()

  const shuffleCards = () => {
    const shuffled = [...tarotCards]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }

  const handleDraw = () => {
    setIsDrawing(true)
    setSelectedCards([])
    setShowResults(false)
    
    // 카드를 섞고 2장을 뽑습니다
    const shuffledCards = shuffleCards()
    const drawnCards = shuffledCards.slice(0, 2)
    
    // 카드를 하나씩 순차적으로 보여주는 효과
    let currentIndex = 0
    
    const drawInterval = setInterval(() => {
      if (currentIndex < drawnCards.length) {
        setSelectedCards(drawnCards.slice(0, currentIndex + 1))
        currentIndex++
      } else {
        clearInterval(drawInterval)
        setIsDrawing(false)
        setShowResults(true)
      }
    }, 1000)
  }

  const handleReset = () => {
    setSelectedCards([])
    setShowResults(false)
  }

  const renderCardBack = (index) => {
    const card = selectedCards[index]
    return (
      <>
        <div className="card-back">
          {card ? card.name : '?'}
        </div>
        {card && (
          <div className="card-front">
            <div className="card-content">
              <div className="card-name">{card.name}</div>
              <div className="card-meaning">{card.meaning}</div>
            </div>
          </div>
        )}
      </>
    )
  }

  const renderCardResult = (card, index) => {
    if (!card) return null

    const timeLabels = ['현재', '미래']
    
    return (
      <div key={`result-${index}`} className="card-result">
        <h4>{timeLabels[index]}: {card.name}</h4>
        <p className="meaning">{card.meaning}</p>
        
        <div className="result-section">
          <h5>조언</h5>
          <ul>
            {card.advice.map((item, i) => (
              <li key={`advice-${i}`}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="result-section">
          <h5>시기</h5>
          <ul>
            {card.timing.map((item, i) => (
              <li key={`timing-${i}`}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="result-section">
          <h5>영역별 의미</h5>
          <ul>
            {card.areas.map((item, i) => (
              <li key={`area-${i}`}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    )
  }

  return (
    <div className="main-container">
      <div className="tarot-header">
        <button onClick={() => navigate('/')} className="back-button">
          ← 메인으로
        </button>
        <h2>타로 카드 뽑기</h2>
      </div>

      <div className="tarot-intro">
        <p>✨ 2장의 카드를 무작위로 뽑아 당신의 운세를 확인하세요.</p>
        <p>✨ 카드는 순서대로 현재와 미래를 나타냅니다.</p>
        <p>✨ 각 카드의 의미와 조언을 통해 인사이트를 얻으세요.</p>
      </div>

      <div className="tarot-container">
        {!showResults ? (
          <div className="draw-section">
            <div className="card-selection">
              {[0, 1].map((index) => (
                <div 
                  key={`card-${index}`} 
                  className={`tarot-card ${index < selectedCards.length ? 'selected' : ''}`}
                >
                  {renderCardBack(index)}
                </div>
              ))}
            </div>
            <button
              onClick={handleDraw}
              disabled={isDrawing}
              className="draw-button"
            >
              {isDrawing ? '카드를 뽑는 중...' : '카드 뽑기'}
            </button>
          </div>
        ) : (
          <div className="result-container">
            {selectedCards.map((card, index) => renderCardResult(card, index))}
            <button onClick={handleReset} className="retry-button">
              다시 뽑기
            </button>
          </div>
        )}
      </div>

      <div className="ad-banner">
        <div style={{background:'#eee', padding:'16px', textAlign:'center', borderRadius:'8px'}}>
          광고 배너 자리
        </div>
      </div>
    </div>
  )
} 