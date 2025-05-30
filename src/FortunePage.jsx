import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './App.css'

const fortunes = [
  {
    title: '새로운 시작의 날',
    desc: '새로운 시작의 날입니다. 당신의 노력이 결실을 맺을 것입니다. 특히 오후 2시에서 4시 사이에 좋은 기회가 찾아올 수 있어요.',
    lucky: ['빨간색', '동쪽', '7'],
    advice: ['새로운 도전을 두려워하지 마세요', '자신의 직관을 믿으세요', '긍정적인 마인드를 유지하세요'],
    timing: ['아침: 새로운 시작에 좋은 시간', '오후: 중요한 결정에 좋은 시간', '저녁: 휴식과 재충전의 시간']
  },
  {
    title: '내면의 지혜를 찾는 날',
    desc: '내면의 지혜를 찾는 날입니다. 당신의 직관을 믿으세요. 오늘은 깊은 통찰을 얻을 수 있는 좋은 기회가 있습니다.',
    lucky: ['파란색', '북쪽', '3'],
    advice: ['내면의 목소리에 귀를 기울이세요', '침착하게 판단하세요', '창의력을 발휘하세요'],
    timing: ['아침: 명상하기 좋은 시간', '오후: 깊은 통찰이 찾아옵니다', '저녁: 내면을 성찰하세요']
  },
  {
    title: '행운이 함께하는 날',
    desc: '행운이 함께하는 날입니다. 당신의 노력이 인정받을 것입니다. 특히 금전적 이득이 있을 수 있어요.',
    lucky: ['노란색', '남쪽', '9'],
    advice: ['자신감을 가지세요', '도전을 두려워하지 마세요', '긍정적인 에너지를 유지하세요'],
    timing: ['아침: 좋은 소식이 들려옵니다', '오후: 성공의 기회가 찾아옵니다', '저녁: 축하할 일이 생깁니다']
  },
  {
    title: '변화와 성장의 날',
    desc: '변화와 성장의 날입니다. 예상치 못한 변화가 찾아올 수 있지만, 이는 긍정적인 변화가 될 것입니다.',
    lucky: ['초록색', '서쪽', '5'],
    advice: ['변화를 두려워하지 마세요', '적응력을 발휘하세요', '새로운 기회를 놓치지 마세요'],
    timing: ['아침: 변화를 받아들이는 시간', '오후: 새로운 시도에 좋은 시간', '저녁: 마음 정리에 좋은 시간']
  },
  {
    title: '사랑과 관계의 날',
    desc: '사랑과 관계의 날입니다. 새로운 인연이 생기거나 기존 관계가 더 깊어질 수 있습니다.',
    lucky: ['분홍색', '남서쪽', '2'],
    advice: ['마음을 열어두세요', '소통을 중요시하세요', '관계를 소중히 여기세요'],
    timing: ['아침: 새로운 만남의 시간', '오후: 관계 발전의 시간', '저녁: 깊은 대화의 시간']
  },
  {
    title: '성공과 승리의 날',
    desc: '성공과 승리의 날입니다. 특히 업무나 학업에서 좋은 결과를 얻을 수 있습니다.',
    lucky: ['보라색', '북동쪽', '8'],
    advice: ['목표를 향해 전진하세요', '자신감을 가지세요', '성과를 축하하세요'],
    timing: ['아침: 중요한 업무에 좋은 시간', '오후: 협상과 계약에 좋은 시간', '저녁: 성과 축하의 시간']
  },
  {
    title: '휴식과 재충전의 날',
    desc: '휴식과 재충전의 날입니다. 무리하지 말고 자신을 돌보세요. 내일을 위한 준비를 하는 것도 좋습니다.',
    lucky: ['하늘색', '북서쪽', '4'],
    advice: ['충분한 휴식을 취하세요', '자신을 돌보세요', '내일을 위한 준비를 하세요'],
    timing: ['아침: 휴식에 좋은 시간', '오후: 자기계발에 좋은 시간', '저녁: 명상과 정리의 시간']
  },
  {
    title: '창의력이 넘치는 날',
    desc: '창의력이 넘치는 날입니다. 새로운 아이디어가 떠오르고, 예술적 영감을 얻을 수 있습니다.',
    lucky: ['주황색', '남동쪽', '6'],
    advice: ['창의력을 발휘하세요', '새로운 시도를 하세요', '영감을 기록하세요'],
    timing: ['아침: 창의적 활동에 좋은 시간', '오후: 아이디어 구체화의 시간', '저녁: 예술적 감상의 시간']
  },
  {
    title: '건강과 활력의 날',
    desc: '건강과 활력의 날입니다. 운동이나 건강 관리에 좋은 날입니다. 에너지가 넘치는 하루가 될 것입니다.',
    lucky: ['연두색', '중앙', '1'],
    advice: ['운동을 시작하세요', '건강한 식습관을 유지하세요', '활력을 유지하세요'],
    timing: ['아침: 운동하기 좋은 시간', '오후: 건강 관리에 좋은 시간', '저녁: 휴식과 회복의 시간']
  },
  {
    title: '지혜와 통찰의 날',
    desc: '지혜와 통찰의 날입니다. 깊은 생각과 통찰을 얻을 수 있으며, 중요한 결정을 내리기에 좋은 날입니다.',
    lucky: ['남색', '북쪽', '0'],
    advice: ['깊이 생각하세요', '지혜로운 결정을 내리세요', '통찰을 기록하세요'],
    timing: ['아침: 깊은 사색의 시간', '오후: 중요한 결정의 시간', '저녁: 통찰을 정리하는 시간']
  }
]

export default function FortunePage() {
  const [birthDate, setBirthDate] = useState('')
  const [showResult, setShowResult] = useState(false)
  const [showProgress, setShowProgress] = useState(false)
  const navigate = useNavigate()
  const [showCopied, setShowCopied] = useState(false)
  const [fortune, setFortune] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    setShowProgress(true)
    setTimeout(() => {
      setShowResult(true)
    }, 500)
  }

  const handleRetry = () => {
    setBirthDate('')
    setShowResult(false)
    setShowProgress(false)
  }

  const calculateFortune = (birthDate) => {
    // 간단한 운세 계산 로직
    const date = new Date(birthDate)
    const day = date.getDate()
    const month = date.getMonth() + 1
    
    const luckyNumber = (day + month) % 10 + 1
    const luckyColor = ['빨강', '파랑', '초록', '노랑', '보라', '주황', '분홍', '하늘', '갈색', '검정'][luckyNumber - 1]
    const luckyDirection = ['동', '서', '남', '북', '동남', '동북', '서남', '서북', '중앙', '상승'][luckyNumber - 1]

    return {
      luckyNumber,
      luckyColor,
      luckyDirection,
      fortune: {
        love: '새로운 인연이 찾아올 것입니다.',
        career: '직장에서 좋은 기회가 올 것입니다.',
        health: '건강에 특별한 문제는 없을 것입니다.',
        wealth: '재물운이 상승하는 시기입니다.'
      },
      advice: [
        '새로운 도전을 두려워하지 마세요.',
        '주변 사람들과의 관계를 소중히 하세요.',
        '건강 관리에 더욱 신경 쓰세요.'
      ],
      warning: [
        '성급한 결정은 피하세요.',
        '과도한 지출을 조심하세요.',
        '건강검진을 받아보세요.'
      ]
    }
  }

  const result = showResult ? calculateFortune(birthDate) : null

  const handleGetFortune = () => {
    setFortune(getFortune())
  }

  const handleShare = () => {
    if (!result) return;
    
    const shareText = `✨ 운세 결과 ✨\n\n행운의 숫자: ${result.luckyNumber}\n행운의 색: ${result.luckyColor}\n행운의 방향: ${result.luckyDirection}\n\n운세\n애정운: ${result.fortune.love}\n직장운: ${result.fortune.career}\n건강운: ${result.fortune.health}\n재물운: ${result.fortune.wealth}\n\n조언\n${result.advice.join('\n')}\n\n주의사항\n${result.warning.join('\n')}\n\n#운세 #운세보기 #심리테스트`;
    navigator.clipboard.writeText(shareText);
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2000);
  }

  return (
    <div className="test-container">
      <div className="test-header">
        <h1 className="test-title">운세 보기</h1>
        <button 
          className="home-button"
          onClick={() => navigate('/')}
        >
          메인으로
        </button>
      </div>

      {!showResult ? (
        <div className="question-container">
          <h2 className="question-number">
            생년월일 입력
          </h2>
          <p className="question-text">
            당신의 운세를 알기 위해 생년월일을 입력해주세요.
          </p>

          <form onSubmit={handleSubmit} className="birth-input">
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              required
            />
            <button
              type="submit"
              className={`draw-button ${!birthDate || showProgress ? 'disabled' : ''}`}
              disabled={!birthDate || showProgress}
            >
              운세 보기
            </button>
          </form>
        </div>
      ) : (
        <div className="question-container">
          <h2 className="question-number">
            운세 결과
          </h2>

          <div className="fortune-section">
            <h3>행운의 숫자와 방향</h3>
            <div className="lucky-items">
              <div className="lucky-item">행운의 숫자: {result.luckyNumber}</div>
              <div className="lucky-item">행운의 색: {result.luckyColor}</div>
              <div className="lucky-item">행운의 방향: {result.luckyDirection}</div>
            </div>
          </div>

          <div className="fortune-section">
            <h3>운세</h3>
            <div className="fortune-grid">
              <div className="grid-item">
                <h4>애정운</h4>
                <p>{result.fortune.love}</p>
              </div>
              <div className="grid-item">
                <h4>직장운</h4>
                <p>{result.fortune.career}</p>
              </div>
              <div className="grid-item">
                <h4>건강운</h4>
                <p>{result.fortune.health}</p>
              </div>
              <div className="grid-item">
                <h4>재물운</h4>
                <p>{result.fortune.wealth}</p>
              </div>
            </div>
          </div>

          <div className="fortune-advice">
            <h4>조언</h4>
            <ul>
              {result.advice.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="fortune-warning">
            <h4>주의사항</h4>
            <ul>
              {result.warning.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="result-actions">
            <button 
              className="share-button" 
              onClick={handleShare}
              disabled={!result}
            >
              {showCopied ? '복사됨!' : '결과 공유하기'}
            </button>
            <button className="retry-button" onClick={handleRetry}>
              다시하기
            </button>
          </div>
        </div>
      )}
    </div>
  )
} 