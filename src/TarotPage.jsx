import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './App.css'

const tarotCards = [
  {
    name: 'The Sun',
    meaning: '성공, 행복, 긍정적인 변화를 의미합니다. 당신의 노력이 결실을 맺을 때입니다.',
    advice: ['자신감을 가지세요', '목표를 향해 전진하세요', '긍정적인 마인드를 유지하세요'],
    timing: ['현재: 매우 좋은 시기', '가까운 미래: 계속되는 성공', '장기적: 지속적인 발전'],
    areas: ['사업/직업: 성공과 승진', '사랑: 행복한 관계', '건강: 활력과 에너지']
  },
  {
    name: 'The Moon',
    meaning: '직관, 영감, 잠재의식을 의미합니다. 당신의 내면의 목소리에 귀를 기울일 때입니다.',
    advice: ['직관을 믿으세요', '내면의 목소리를 들어보세요', '창의력을 발휘하세요'],
    timing: ['현재: 내면 성찰의 시기', '가까운 미래: 새로운 통찰', '장기적: 영적 성장'],
    areas: ['사업/직업: 창의적 접근', '사랑: 깊은 이해', '건강: 정신적 균형']
  },
  {
    name: 'The Star',
    meaning: '희망, 영감, 새로운 시작을 의미합니다. 당신의 꿈을 향해 나아갈 때입니다.',
    advice: ['희망을 잃지 마세요', '새로운 시작을 두려워하지 마세요', '꿈을 향해 나아가세요'],
    timing: ['현재: 새로운 시작', '가까운 미래: 희망찬 변화', '장기적: 꿈의 실현'],
    areas: ['사업/직업: 새로운 기회', '사랑: 새로운 관계', '건강: 회복과 치유']
  },
  {
    name: 'Wheel of Fortune',
    meaning: '변화, 순환, 운명을 의미합니다. 인생의 변화를 받아들이세요.',
    advice: ['변화를 받아들이세요', '유연하게 대처하세요', '새로운 기회를 잡으세요'],
    timing: ['현재: 변화의 시기', '가까운 미래: 새로운 단계', '장기적: 순환적 성장'],
    areas: ['사업/직업: 변화와 기회', '사랑: 관계의 변화', '건강: 새로운 시작']
  },
  {
    name: 'The High Priestess',
    meaning: '지혜, 직관, 내면의 지식을 의미합니다. 당신의 내면의 지혜를 믿으세요.',
    advice: ['내면의 지혜를 믿으세요', '침착하게 판단하세요', '직관을 따르세요'],
    timing: ['현재: 성찰의 시기', '가까운 미래: 통찰', '장기적: 지혜의 축적'],
    areas: ['사업/직업: 현명한 결정', '사랑: 깊은 이해', '건강: 균형과 조화']
  },
  {
    name: 'The Magician',
    meaning: '창의성, 의지력, 새로운 시작을 의미합니다. 당신의 잠재력을 발휘하세요.',
    advice: ['잠재력을 믿으세요', '의지력을 발휘하세요', '창의적으로 접근하세요'],
    timing: ['현재: 새로운 시작', '가까운 미래: 성공의 기회', '장기적: 목표 달성'],
    areas: ['사업/직업: 창의적 성공', '사랑: 새로운 관계', '건강: 활력 회복']
  },
  {
    name: 'The Empress',
    meaning: '풍요, 창조성, 모성적 에너지를 의미합니다. 당신의 창조적 에너지를 발휘하세요.',
    advice: ['창조성을 발휘하세요', '풍요로움을 받아들이세요', '자연과 조화를 이루세요'],
    timing: ['현재: 성장의 시기', '가까운 미래: 풍요로움', '장기적: 지속적 성장'],
    areas: ['사업/직업: 창조적 성공', '사랑: 풍요로운 관계', '건강: 활력과 건강']
  },
  {
    name: 'The Emperor',
    meaning: '권위, 안정, 구조를 의미합니다. 당신의 리더십을 발휘하세요.',
    advice: ['리더십을 발휘하세요', '체계적으로 접근하세요', '안정을 추구하세요'],
    timing: ['현재: 안정의 시기', '가까운 미래: 성공', '장기적: 지속적 성장'],
    areas: ['사업/직업: 리더십 발휘', '사랑: 안정된 관계', '건강: 균형과 안정']
  },
  {
    name: 'The Lovers',
    meaning: '사랑, 선택, 조화를 의미합니다. 당신의 마음에 따라 선택하세요.',
    advice: ['마음의 소리에 귀를 기울이세요', '진정한 선택을 하세요', '조화를 추구하세요'],
    timing: ['현재: 선택의 시기', '가까운 미래: 새로운 관계', '장기적: 조화로운 발전'],
    areas: ['사업/직업: 새로운 협력', '사랑: 진정한 관계', '건강: 균형과 조화']
  },
  {
    name: 'The Hermit',
    meaning: '내면의 지혜, 성찰, 고독을 의미합니다. 당신의 내면을 탐구하세요.',
    advice: ['내면을 탐구하세요', '지혜를 찾으세요', '고독을 받아들이세요'],
    timing: ['현재: 성찰의 시기', '가까운 미래: 통찰', '장기적: 지혜의 축적'],
    areas: ['사업/직업: 깊은 통찰', '사랑: 내면의 성장', '건강: 정신적 균형']
  }
]

export default function TarotPage() {
  const [selectedCards, setSelectedCards] = useState([])
  const [showResults, setShowResults] = useState(false)
  const [isDrawing, setIsDrawing] = useState(false)
  const navigate = useNavigate()
  const [showCopied, setShowCopied] = useState(false)

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

  const handleShare = () => {
    if (selectedCards.length !== 2) return;
    
    const shareText = `✨ 타로 카드 결과 ✨\n\n현재: ${selectedCards[0].name}\n${selectedCards[0].meaning}\n\n미래: ${selectedCards[1].name}\n${selectedCards[1].meaning}\n\n#타로 #타로카드 #운세 #점`;
    navigator.clipboard.writeText(shareText);
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2000);
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
          <div className="instagram-result-container">
            <div className="instagram-card">
              <div className="instagram-header">
                <div className="profile-section">
                  <div className="profile-pic">🎴</div>
                  <div className="profile-info">
                    <div className="username">타로 카드</div>
                    <div className="location">현재와 미래의 통찰</div>
                  </div>
                </div>
                <button className="share-button" onClick={handleShare}>
                  {showCopied ? '복사됨!' : '공유하기'}
                </button>
              </div>

              <div className="instagram-content">
                <div className="card-selection">
                  {selectedCards.map((card, index) => (
                    <div key={`card-${index}`} className="tarot-card selected">
                      <div className="card-front">
                        <div className="card-content">
                          <div className="card-name">{card.name}</div>
                          <div className="card-meaning">{card.meaning}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="instagram-grid">
                  {selectedCards.map((card, index) => (
                    <div key={`result-${index}`} className="grid-item">
                      <h4>{index === 0 ? '현재' : '미래'}: {card.name}</h4>
                      
                      <div className="result-section">
                        <h5>조언</h5>
                        <ul className="instagram-list">
                          {card.advice.map((item, i) => (
                            <li key={`advice-${i}`}>✨ {item}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="result-section">
                        <h5>시기</h5>
                        <ul className="instagram-list">
                          {card.timing.map((item, i) => (
                            <li key={`timing-${i}`}>⏳ {item}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="result-section">
                        <h5>영역별 의미</h5>
                        <ul className="instagram-list">
                          {card.areas.map((item, i) => (
                            <li key={`area-${i}`}>🎯 {item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="instagram-footer">
                  <div className="hashtags">
                    #타로 #타로카드 #운세 #점 #현재와미래
                  </div>
                </div>
              </div>
            </div>

            <button onClick={handleReset} className="retry-button">
              다시 뽑기
            </button>
          </div>
        )}
      </div>

      <div className="ad-banner">
        <ins 
          className="kakao_ad_area" 
          style={{ display: 'block', width: '100%', textAlign: 'center' }}
          data-ad-unit="DAN-H8ERcNgrJCMrs1Ub"
          data-ad-width="320"
          data-ad-height="100"
        />
      </div>
    </div>
  )
} 