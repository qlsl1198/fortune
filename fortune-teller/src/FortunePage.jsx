import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const fortunes = [
  {
    title: '🌟 행운의 날',
    desc: '오늘은 당신에게 행운이 따르는 날입니다. 새로운 도전을 시작하기에 좋은 시기예요. 특히 오후 2시에서 4시 사이에 좋은 기회가 찾아올 수 있어요.',
    lucky: ['숫자: 7, 3', '색깔: 파란색', '방향: 동쪽'],
    advice: ['새로운 도전을 시작하세요', '긍정적인 마인드를 유지하세요', '주변 사람들과 소통하세요'],
    timing: ['오전: 새로운 시작에 좋음', '오후: 중요한 결정에 좋음', '저녁: 휴식과 재충전에 좋음']
  },
  {
    title: '💫 변화의 날',
    desc: '오늘은 변화를 받아들이기에 좋은 날입니다. 예상치 못한 변화가 찾아올 수 있지만, 이는 긍정적인 변화가 될 거예요. 유연하게 대처하세요.',
    lucky: ['숫자: 5, 9', '색깔: 초록색', '방향: 남쪽'],
    advice: ['변화를 두려워하지 마세요', '적응력을 발휘하세요', '새로운 기회를 놓치지 마세요'],
    timing: ['오전: 변화 수용에 좋음', '오후: 새로운 시도에 좋음', '저녁: 마음 정리에 좋음']
  },
  {
    title: '✨ 성공의 날',
    desc: '오늘은 당신의 노력이 결실을 맺는 날입니다. 특히 업무나 학업에서 좋은 결과를 얻을 수 있어요. 자신감을 가지고 도전하세요.',
    lucky: ['숫자: 1, 8', '색깔: 빨간색', '방향: 북쪽'],
    advice: ['목표를 향해 전진하세요', '자신감을 가지세요', '성과를 축하하세요'],
    timing: ['오전: 중요한 업무에 좋음', '오후: 협상과 계약에 좋음', '저녁: 성과 축하에 좋음']
  },
  {
    title: '🌙 휴식의 날',
    desc: '오늘은 휴식을 취하기에 좋은 날입니다. 무리하지 말고 자신을 돌보세요. 내일을 위한 준비를 하는 것도 좋아요.',
    lucky: ['숫자: 2, 6', '색깔: 보라색', '방향: 서쪽'],
    advice: ['충분한 휴식을 취하세요', '자신을 돌보세요', '내일을 위한 준비를 하세요'],
    timing: ['오전: 휴식에 좋음', '오후: 자기계발에 좋음', '저녁: 명상과 정리에 좋음']
  }
]

export default function FortunePage() {
  const [birthDate, setBirthDate] = useState('')
  const [fortune, setFortune] = useState(null)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const date = new Date(birthDate)
    const day = date.getDate()
    const fortuneIndex = day % fortunes.length
    setFortune(fortunes[fortuneIndex])
  }

  return (
    <div className="main-container">
      <div className="fortune-header">
        <button onClick={() => navigate('/')} className="back-button">
          ← 메인으로
        </button>
        <h2>오늘의 운세</h2>
      </div>

      {!fortune ? (
        <div className="fortune-container">
          <div className="fortune-intro">
            <p>💫 당신의 생년월일을 입력하면 오늘의 운세를 알려드립니다.</p>
            <p>💫 운세는 매일 새롭게 갱신됩니다.</p>
            <p>💫 행운의 숫자, 색깔, 방향도 함께 확인하세요.</p>
          </div>

          <form onSubmit={handleSubmit} className="fortune-form">
            <p>당신의 생년월일을 입력해주세요</p>
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              required
              className="date-input"
            />
            <button type="submit" className="submit-button">운세 보기</button>
          </form>
        </div>
      ) : (
        <div className="result-container">
          <h3 className="result-title">{fortune.title}</h3>
          <p className="result-desc">{fortune.desc}</p>

          <div className="result-section">
            <h4>오늘의 행운 아이템</h4>
            <div className="lucky-items">
              {fortune.lucky.map((item, index) => (
                <div key={index} className="lucky-item">{item}</div>
              ))}
            </div>
          </div>

          <div className="result-section">
            <h4>오늘의 조언</h4>
            <ul>
              {fortune.advice.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="result-section">
            <h4>시간대별 운세</h4>
            <ul>
              {fortune.timing.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <button onClick={() => setFortune(null)} className="retry-button">
            다시 보기
          </button>
        </div>
      )}

      <div className="ad-banner">
        <div style={{background:'#eee', padding:'16px', textAlign:'center', borderRadius:'8px'}}>
          광고 배너 자리
        </div>
      </div>
    </div>
  )
} 