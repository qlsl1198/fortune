import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './App.css'

const questions = [
  {
    id: 1,
    question: '친구들과 만났을 때 나는...',
    options: [
      { text: '대화를 주도하며 분위기를 이끌어간다', type: 'leader' },
      { text: '다른 사람들의 이야기를 듣는 것을 좋아한다', type: 'listener' }
    ]
  },
  {
    id: 2,
    question: '문제를 해결할 때 나는...',
    options: [
      { text: '직관과 감에 의존한다', type: 'intuitive' },
      { text: '사실과 경험에 의존한다', type: 'practical' }
    ]
  },
  {
    id: 3,
    question: '의사결정을 할 때 나는...',
    options: [
      { text: '논리와 객관적 사실을 중시한다', type: 'logical' },
      { text: '감정과 관계를 중시한다', type: 'emotional' }
    ]
  },
  {
    id: 4,
    question: '일상생활에서 나는...',
    options: [
      { text: '계획을 세우고 그대로 실행한다', type: 'planner' },
      { text: '상황에 따라 유연하게 대처한다', type: 'flexible' }
    ]
  },
  {
    id: 5,
    question: '스트레스를 받았을 때 나는...',
    options: [
      { text: '활동적으로 스트레스를 해소한다', type: 'active' },
      { text: '조용히 혼자만의 시간을 가진다', type: 'calm' }
    ]
  },
  {
    id: 6,
    question: '새로운 도전을 할 때 나는...',
    options: [
      { text: '즉시 도전하고 경험해본다', type: 'adventurous' },
      { text: '신중하게 검토하고 준비한다', type: 'cautious' }
    ]
  },
  {
    id: 7,
    question: '갈등 상황에서 나는...',
    options: [
      { text: '직접적으로 문제를 해결하려 한다', type: 'direct' },
      { text: '양측의 입장을 고려하며 조화를 찾는다', type: 'harmonious' }
    ]
  },
  {
    id: 8,
    question: '목표를 향해 나아갈 때 나는...',
    options: [
      { text: '결과와 성과를 중시한다', type: 'result' },
      { text: '과정과 경험을 중시한다', type: 'process' }
    ]
  }
]

function TestPage() {
  const navigate = useNavigate()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState([])
  const [showProgress, setShowProgress] = useState(false)

  const handleAnswer = (type) => {
    const newAnswers = [...answers, type]
    setAnswers(newAnswers)
    setShowProgress(true)

    if (currentQuestion < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1)
        setShowProgress(false)
      }, 500)
    } else {
      const result = calculatePersonalityType(newAnswers)
      setTimeout(() => {
        navigate('/result', { state: { result } })
      }, 500)
    }
  }

  const calculatePersonalityType = (answers) => {
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
      },
      {
        type: '✨ 자유로운 영혼형',
        description: '당신은 자유롭고 창의적인 영혼을 가진 타입입니다. 새로운 경험을 추구하며, 독창적인 생각을 합니다.',
        traits: ['자유로움', '창의적', '모험적', '독창적'],
        strengths: ['창의력이 뛰어남', '적응력이 좋음', '새로운 시도 두려워하지 않음', '독립적'],
        weaknesses: ['규칙을 싫어함', '책임감이 부족할 수 있음', '일상적인 것에 지루함을 느낌'],
        careers: ['예술가', '여행작가', '프리랜서', '창업가']
      },
      {
        type: '💫 따뜻한 보호자형',
        description: '당신은 따뜻한 마음과 보호 본능을 가진 타입입니다. 타인을 돕고 보호하는 것을 좋아하며, 안정적인 관계를 추구합니다.',
        traits: ['보호적', '배려심', '안정적', '신뢰성'],
        strengths: ['공감능력이 뛰어남', '책임감이 강함', '신뢰성', '보호 본능'],
        weaknesses: ['과보호적일 수 있음', '자기희생적 성향', '변화를 두려워할 수 있음'],
        careers: ['의료인', '상담사', '교사', '사회복지사']
      }
    ]

    // 답변 패턴에 따라 성격 유형 결정
    const typeCounts = {
      leader: 0, listener: 0,
      intuitive: 0, practical: 0,
      logical: 0, emotional: 0,
      planner: 0, flexible: 0,
      active: 0, calm: 0,
      adventurous: 0, cautious: 0,
      direct: 0, harmonious: 0,
      result: 0, process: 0
    }

    answers.forEach(type => {
      typeCounts[type]++
    })

    // 답변 패턴 분석
    const isLeader = typeCounts.leader > typeCounts.listener
    const isIntuitive = typeCounts.intuitive > typeCounts.practical
    const isEmotional = typeCounts.emotional > typeCounts.logical
    const isFlexible = typeCounts.flexible > typeCounts.planner
    const isActive = typeCounts.active > typeCounts.calm
    const isAdventurous = typeCounts.adventurous > typeCounts.cautious
    const isHarmonious = typeCounts.harmonious > typeCounts.direct
    const isProcess = typeCounts.process > typeCounts.result

    // 성격 유형 결정 로직
    if (isLeader && isActive && !isEmotional) {
      return personalityTypes[0] // 활발한 리더형
    } else if (isEmotional && isIntuitive && isProcess) {
      return personalityTypes[1] // 감성적인 예술가형
    } else if (!isEmotional && !isIntuitive && !isFlexible) {
      return personalityTypes[2] // 논리적인 분석가형
    } else if (isHarmonious && !isLeader && !isAdventurous) {
      return personalityTypes[3] // 균형잡힌 조화형
    } else if (isAdventurous && isFlexible && !isPlanner) {
      return personalityTypes[4] // 자유로운 영혼형
    } else {
      return personalityTypes[5] // 따뜻한 보호자형
    }
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <div className="test-container">
      <div className="progress-bar">
        <div 
          className="progress-fill"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="question-container">
        <h2 className="question-number">
          Q{currentQuestion + 1}
        </h2>
        <p className="question-text">
          {questions[currentQuestion].question}
        </p>

        <div className="options-container">
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              className={`option-button ${showProgress ? 'disabled' : ''}`}
              onClick={() => handleAnswer(option.type)}
              disabled={showProgress}
            >
              {option.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TestPage 