import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const questions = [
  {
    question: "친구들과 함께 있을 때 당신은 주로...",
    options: [
      "대화를 주도하고 분위기를 이끌어요",
      "다른 사람들의 이야기를 잘 들어주는 편이에요",
      "상황에 따라 적절히 대응해요",
      "조용히 관찰하는 편이에요"
    ]
  },
  {
    question: "스트레스를 받았을 때 당신은...",
    options: [
      "활동적인 운동이나 취미로 해소해요",
      "혼자만의 시간을 가지며 휴식을 취해요",
      "친구나 가족과 대화하며 해소해요",
      "음악이나 영화를 보며 해소해요"
    ]
  },
  {
    question: "새로운 도전을 앞두고 있을 때 당신은...",
    options: [
      "즉시 실행에 옮기고 시행착오를 겪어요",
      "철저한 계획을 세우고 준비해요",
      "다른 사람의 조언을 구하고 결정해요",
      "기회가 올 때까지 기다려요"
    ]
  },
  {
    question: "문제가 발생했을 때 당신은...",
    options: [
      "논리적으로 분석하고 해결책을 찾아요",
      "감정에 따라 직관적으로 해결해요",
      "다른 사람의 도움을 받아 해결해요",
      "시간이 해결해줄 때까지 기다려요"
    ]
  },
  {
    question: "당신의 이상적인 주말은...",
    options: [
      "친구들과 함께하는 활동적인 시간",
      "혼자만의 여유로운 시간",
      "가족과 함께하는 따뜻한 시간",
      "새로운 취미나 공부를 하는 시간"
    ]
  },
  {
    question: "의견이 다른 사람과 대화할 때 당신은...",
    options: [
      "자신의 의견을 강하게 주장해요",
      "상대방의 의견을 존중하며 대화해요",
      "중간에서 조율하려고 노력해요",
      "불편한 상황을 피하려고 해요"
    ]
  },
  {
    question: "당신의 강점은...",
    options: [
      "리더십과 실행력",
      "공감능력과 이해심",
      "분석력과 판단력",
      "창의력과 상상력"
    ]
  },
  {
    question: "실패했을 때 당신은...",
    options: [
      "즉시 다시 도전해요",
      "원인을 분석하고 교훈을 얻어요",
      "다른 사람의 조언을 구해요",
      "잠시 휴식을 취하고 마음을 다잡아요"
    ]
  },
  {
    question: "당신이 가장 중요하게 생각하는 것은...",
    options: [
      "성공과 성취",
      "인간관계와 사랑",
      "안정과 평화",
      "자유와 창의성"
    ]
  },
  {
    question: "미래에 대해 생각할 때 당신은...",
    options: [
      "구체적인 목표와 계획을 세워요",
      "현재에 충실하며 살아가요",
      "가족과의 행복한 미래를 꿈꿔요",
      "새로운 가능성들을 상상해요"
    ]
  }
]

export default function TestPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState([])
  const navigate = useNavigate()

  const handleAnswer = (answer) => {
    const newAnswers = [...answers, answer]
    setAnswers(newAnswers)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      navigate('/result', { state: { answers: newAnswers } })
    }
  }

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      setAnswers(answers.slice(0, -1))
    } else {
      navigate('/')
    }
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <div className="main-container">
      <div className="test-header">
        <button onClick={handleBack} className="back-button">
          ← 뒤로가기
        </button>
        <h2>성격 유형 테스트</h2>
        <div className="progress-info">
          {currentQuestion + 1} / {questions.length}
        </div>
      </div>

      <div className="progress-bar">
        <div className="progress" style={{ width: `${progress}%` }}></div>
      </div>

      <div className="test-container">
        <div className="question">
          <h3>Q{currentQuestion + 1}. {questions[currentQuestion].question}</h3>
        </div>
        <div className="options">
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              className="option-button"
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="test-description">
        <p>💡 이 테스트는 당신의 성격 유형을 분석하여 가장 잘 맞는 유형을 찾아드립니다.</p>
        <p>💡 정답은 없으니 편안한 마음으로 답변해주세요.</p>
        <p>💡 모든 질문에 답변하시면 상세한 결과를 확인하실 수 있습니다.</p>
      </div>

      <div className="ad-banner">
        <ins className="kakao_ad_area" 
          style={{ display: 'none' }}
          data-ad-unit="DAN-rz0SXdqQnXMRUyny"
          data-ad-width="320"
          data-ad-height="100"
        />
      </div>
    </div>
  )
} 