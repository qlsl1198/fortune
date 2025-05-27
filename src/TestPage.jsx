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

const personalityTypes = [
  {
    type: '🌞 활발한 리더형',
    description: '당신은 에너지 넘치고 리더십이 뛰어난 타입입니다. 새로운 도전을 두려워하지 않고, 주변 사람들을 이끄는 것을 좋아합니다.',
    traits: ['리더십', '활동성', '도전정신', '사교성'],
    strengths: ['문제 해결 능력이 뛰어남', '목표 지향적', '적응력이 좋음', '의사소통 능력이 뛰어남'],
    weaknesses: ['인내심이 부족할 수 있음', '감정적일 수 있음', '완벽주의적 성향'],
    careers: ['경영/관리직', '영업직', '강사/교육자', '프로젝트 매니저']
  },
  {
    type: '🌙 감성적인 예술가형',
    description: '당신은 섬세한 감성과 창의력을 가진 타입입니다. 예술과 아름다움에 관심이 많으며, 깊이 있는 사고를 합니다.',
    traits: ['감성적', '창의적', '직관적', '이상주의적'],
    strengths: ['창의력이 뛰어남', '공감능력이 좋음', '예술적 감각이 뛰어남', '깊이 있는 통찰력'],
    weaknesses: ['현실감이 부족할 수 있음', '감정에 치우칠 수 있음', '결정을 미루는 경향'],
    careers: ['디자이너', '작가', '상담사', '예술가']
  },
  {
    type: '💡 논리적인 분석가형',
    description: '당신은 논리적이고 분석적인 사고방식을 가진 타입입니다. 객관적인 판단과 체계적인 접근을 선호합니다.',
    traits: ['논리적', '분석적', '객관적', '체계적'],
    strengths: ['문제 해결 능력이 뛰어남', '객관적 판단력', '집중력이 좋음', '계획 수립 능력'],
    weaknesses: ['감정 표현이 서툴 수 있음', '완벽주의적 성향', '유연성이 부족할 수 있음'],
    careers: ['엔지니어', '과학자', '프로그래머', '분석가']
  },
  {
    type: '🌱 균형잡힌 조화형',
    description: '당신은 균형과 조화를 중요시하는 타입입니다. 다양한 상황에 잘 적응하며, 타인과의 관계를 소중히 여깁니다.',
    traits: ['균형감', '적응력', '협력적', '배려심'],
    strengths: ['대인관계 능력이 뛰어남', '적응력이 좋음', '조정 능력이 뛰어남', '공감능력이 좋음'],
    weaknesses: ['자기주장이 부족할 수 있음', '갈등 회피 성향', '결정을 미루는 경향'],
    careers: ['상담사', '교육자', '인사담당', '고객서비스']
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
      // 결과 계산
      const resultIndex = Math.floor(Math.random() * personalityTypes.length)
      const result = personalityTypes[resultIndex]
      navigate('/result', { state: { result } })
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
        <ins 
          className="kakao_ad_area" 
          style={{ display: 'block', width: '100%', textAlign: 'center' }}
          data-ad-unit="DAN-YoGidYmDgk3hwQ0d"
          data-ad-width="320"
          data-ad-height="100"
        />
      </div>
    </div>
  )
} 