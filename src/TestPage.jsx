import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './App.css'

const questions = [
  // 리더십 관련 문항
  {
    id: 1,
    question: '친구들과 만났을 때 나는...',
    options: [
      { text: '대화를 주도하며 분위기를 이끌어간다', type: 'leader' },
      { text: '다른 사람들의 이야기를 듣는 것을 좋아한다', type: 'listener' },
      { text: '상황에 따라 주도하기도 하고 듣기도 한다', type: 'balanced' },
      { text: '대화보다는 함께 있는 시간을 즐긴다', type: 'observer' }
    ]
  },
  {
    id: 2,
    question: '팀 프로젝트에서 나는...',
    options: [
      { text: '팀장이 되어 전체를 이끄는 것을 선호한다', type: 'leader' },
      { text: '팀원으로서 맡은 역할을 충실히 수행한다', type: 'listener' },
      { text: '필요한 부분에서 적극적으로 도움을 준다', type: 'supporter' },
      { text: '팀의 분위기를 조절하고 조화를 이끈다', type: 'harmonizer' }
    ]
  },
  {
    id: 3,
    question: '의사결정을 할 때 나는...',
    options: [
      { text: '빠르게 결정하고 실행에 옮긴다', type: 'leader' },
      { text: '신중하게 고민한 후 결정한다', type: 'listener' },
      { text: '다른 사람들의 의견을 듣고 결정한다', type: 'collaborative' },
      { text: '상황에 따라 유연하게 결정한다', type: 'adaptive' }
    ]
  },

  // 감성/논리 관련 문항
  {
    id: 4,
    question: '문제를 해결할 때 나는...',
    options: [
      { text: '직관과 감에 의존한다', type: 'intuitive' },
      { text: '사실과 경험에 의존한다', type: 'practical' },
      { text: '직관과 경험을 모두 고려한다', type: 'balanced' },
      { text: '문제의 맥락과 상황을 분석한다', type: 'analytical' }
    ]
  },
  {
    id: 5,
    question: '타인의 감정에 대해 나는...',
    options: [
      { text: '공감하고 이해하려 노력한다', type: 'intuitive' },
      { text: '객관적인 시각에서 바라본다', type: 'practical' },
      { text: '상황에 따라 다르게 대응한다', type: 'adaptive' },
      { text: '문제 해결에 초점을 맞춘다', type: 'solution' }
    ]
  },
  {
    id: 6,
    question: '예술 작품을 감상할 때 나는...',
    options: [
      { text: '작품이 주는 감정과 의미에 집중한다', type: 'intuitive' },
      { text: '작품의 기술적 측면을 분석한다', type: 'practical' },
      { text: '작품의 배경과 맥락을 이해하려 한다', type: 'contextual' },
      { text: '작품이 주는 메시지를 찾는다', type: 'message' }
    ]
  },

  // 계획성 관련 문항
  {
    id: 7,
    question: '일상생활에서 나는...',
    options: [
      { text: '계획을 세우고 그대로 실행한다', type: 'planner' },
      { text: '상황에 따라 유연하게 대처한다', type: 'flexible' },
      { text: '중요한 일만 계획하고 나머지는 유연하게', type: 'priority' },
      { text: '즉흥적으로 일을 처리한다', type: 'spontaneous' }
    ]
  },
  {
    id: 8,
    question: '여행을 갈 때 나는...',
    options: [
      { text: '상세한 일정을 미리 계획한다', type: 'planner' },
      { text: '즉흥적으로 즐기는 것을 선호한다', type: 'flexible' },
      { text: '주요 일정만 정하고 나머지는 자유롭게', type: 'semi' },
      { text: '현지에서 추천받은 곳을 간다', type: 'local' }
    ]
  },
  {
    id: 9,
    question: '새로운 일을 시작할 때 나는...',
    options: [
      { text: '준비를 철저히 하고 시작한다', type: 'planner' },
      { text: '시작하면서 필요한 것을 배운다', type: 'flexible' },
      { text: '기본적인 준비만 하고 시작한다', type: 'basic' },
      { text: '즉시 시작하고 문제가 생기면 해결한다', type: 'quick' }
    ]
  },

  // 활동성 관련 문항
  {
    id: 10,
    question: '스트레스를 받았을 때 나는...',
    options: [
      { text: '활동적으로 스트레스를 해소한다', type: 'active' },
      { text: '조용히 혼자만의 시간을 가진다', type: 'calm' },
      { text: '친구들과 만나 이야기를 나눈다', type: 'social' },
      { text: '취미 활동에 몰두한다', type: 'hobby' }
    ]
  },
  {
    id: 11,
    question: '휴가를 보낼 때 나는...',
    options: [
      { text: '다양한 활동을 하며 시간을 채운다', type: 'active' },
      { text: '여유롭게 휴식을 취한다', type: 'calm' },
      { text: '새로운 경험을 찾아 떠난다', type: 'adventure' },
      { text: '가족이나 친구와 함께 보낸다', type: 'family' }
    ]
  },
  {
    id: 12,
    question: '주말을 보낼 때 나는...',
    options: [
      { text: '친구들을 만나거나 외출한다', type: 'active' },
      { text: '집에서 편안하게 보낸다', type: 'calm' },
      { text: '취미 활동을 한다', type: 'hobby' },
      { text: '가족과 함께 시간을 보낸다', type: 'family' }
    ]
  },

  // 도전성 관련 문항
  {
    id: 13,
    question: '새로운 도전을 할 때 나는...',
    options: [
      { text: '즉시 도전하고 경험해본다', type: 'adventurous' },
      { text: '신중하게 검토하고 준비한다', type: 'cautious' },
      { text: '기본적인 준비 후 도전한다', type: 'prepared' },
      { text: '필요한 경우에만 도전한다', type: 'selective' }
    ]
  },
  {
    id: 14,
    question: '익숙하지 않은 상황에서 나는...',
    options: [
      { text: '새로운 경험을 즐긴다', type: 'adventurous' },
      { text: '안전한 방법을 찾는다', type: 'cautious' },
      { text: '상황을 분석하고 대처한다', type: 'analytical' },
      { text: '도움이 필요하면 요청한다', type: 'support' }
    ]
  },
  {
    id: 15,
    question: '실패했을 때 나는...',
    options: [
      { text: '다시 도전한다', type: 'adventurous' },
      { text: '원인을 분석하고 보완한다', type: 'cautious' },
      { text: '다른 방법을 찾아본다', type: 'alternative' },
      { text: '잠시 휴식을 취하고 재시도한다', type: 'rest' }
    ]
  },

  // 대인관계 관련 문항
  {
    id: 16,
    question: '갈등 상황에서 나는...',
    options: [
      { text: '직접적으로 문제를 해결하려 한다', type: 'direct' },
      { text: '양측의 입장을 고려하며 조화를 찾는다', type: 'harmonious' },
      { text: '객관적인 해결책을 제시한다', type: 'objective' },
      { text: '시간을 두고 천천히 해결한다', type: 'patient' }
    ]
  },
  {
    id: 17,
    question: '타인의 의견이 다를 때 나는...',
    options: [
      { text: '내 의견을 명확히 전달한다', type: 'direct' },
      { text: '상대방의 의견을 존중한다', type: 'harmonious' },
      { text: '의견을 조율하여 합의점을 찾는다', type: 'compromise' },
      { text: '상황에 따라 다르게 대응한다', type: 'adaptive' }
    ]
  },
  {
    id: 18,
    question: '팀 내에서 의견 충돌이 있을 때 나는...',
    options: [
      { text: '논리적으로 해결책을 제시한다', type: 'direct' },
      { text: '모두가 만족할 수 있는 방안을 찾는다', type: 'harmonious' },
      { text: '각자의 의견을 수렴하여 종합한다', type: 'synthetic' },
      { text: '중재자의 역할을 맡는다', type: 'mediator' }
    ]
  },

  // 가치관 관련 문항
  {
    id: 19,
    question: '목표를 향해 나아갈 때 나는...',
    options: [
      { text: '결과와 성과를 중시한다', type: 'result' },
      { text: '과정과 경험을 중시한다', type: 'process' },
      { text: '목표 달성과 성장을 모두 추구한다', type: 'balanced' },
      { text: '상황에 따라 다르게 접근한다', type: 'adaptive' }
    ]
  },
  {
    id: 20,
    question: '일을 할 때 나는...',
    options: [
      { text: '효율성과 결과를 중요시한다', type: 'result' },
      { text: '즐거움과 의미를 중요시한다', type: 'process' },
      { text: '품질과 완성도를 중요시한다', type: 'quality' },
      { text: '협력과 팀워크를 중요시한다', type: 'team' }
    ]
  },
  {
    id: 21,
    question: '성공을 정의할 때 나는...',
    options: [
      { text: '목표 달성과 성과를 기준으로 한다', type: 'result' },
      { text: '성장과 경험을 기준으로 한다', type: 'process' },
      { text: '만족감과 행복을 기준으로 한다', type: 'satisfaction' },
      { text: '사회적 기여도를 기준으로 한다', type: 'contribution' }
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
    const counts = {
      // 리더십 관련
      leader: 0, listener: 0, balanced: 0, observer: 0,
      supporter: 0, harmonizer: 0, collaborative: 0, adaptive: 0,
      
      // 감성/논리 관련
      intuitive: 0, practical: 0, analytical: 0, contextual: 0,
      message: 0, solution: 0,
      
      // 계획성 관련
      planner: 0, flexible: 0, priority: 0, spontaneous: 0,
      semi: 0, local: 0, basic: 0, quick: 0,
      
      // 활동성 관련
      active: 0, calm: 0, social: 0, hobby: 0,
      adventure: 0, family: 0,
      
      // 도전성 관련
      adventurous: 0, cautious: 0, prepared: 0, selective: 0,
      alternative: 0, rest: 0, support: 0,
      
      // 대인관계 관련
      direct: 0, harmonious: 0, objective: 0, patient: 0,
      compromise: 0, synthetic: 0, mediator: 0,
      
      // 가치관 관련
      result: 0, process: 0, quality: 0, team: 0,
      satisfaction: 0, contribution: 0
    }

    answers.forEach(answer => {
      counts[answer.type]++
    })

    // 리더십 성향 점수
    const leadershipScore = (counts.leader + counts.supporter) - (counts.listener + counts.observer)
    // 감성/논리 성향 점수
    const emotionalScore = (counts.intuitive + counts.contextual) - (counts.practical + counts.analytical)
    // 계획성 성향 점수
    const planningScore = (counts.planner + counts.priority) - (counts.flexible + counts.spontaneous)
    // 활동성 성향 점수
    const activityScore = (counts.active + counts.social) - (counts.calm + counts.family)
    // 도전성 성향 점수
    const adventureScore = (counts.adventurous + counts.prepared) - (counts.cautious + counts.selective)
    // 대인관계 성향 점수
    const relationshipScore = (counts.direct + counts.objective) - (counts.harmonious + counts.mediator)
    // 가치관 성향 점수
    const valueScore = (counts.result + counts.quality) - (counts.process + counts.satisfaction)

    const results = []

    // 활발한 리더형
    if (leadershipScore > 0 && activityScore > 0 && adventureScore > 0) {
      results.push({
        type: '활발한 리더형',
        description: '당신은 활발하고 도전적인 리더십을 가진 사람입니다. 새로운 상황에서도 주도적으로 행동하며, 팀을 이끄는 것을 즐깁니다.',
        traits: ['리더십', '활동성', '도전정신', '결단력'],
        strengths: ['팀 리더십', '의사결정 능력', '적응력', '에너지'],
        weaknesses: ['인내심 부족', '과도한 자신감', '타인 배려 부족'],
        careers: ['경영자', '프로젝트 매니저', '영업직', '창업가']
      })
    }

    // 감성적인 예술가형
    if (emotionalScore > 0 && planningScore < 0 && valueScore < 0) {
      results.push({
        type: '감성적인 예술가형',
        description: '당신은 감성적이고 창의적인 예술가적 성향을 가진 사람입니다. 타인의 감정에 공감하며, 아름다움과 의미를 추구합니다.',
        traits: ['감성적', '창의적', '공감능력', '예술적 감각'],
        strengths: ['창의력', '감성적 이해', '예술적 표현', '직관력'],
        weaknesses: ['감정 기복', '현실감 부족', '결정 장애'],
        careers: ['예술가', '디자이너', '상담사', '교육자']
      })
    }

    // 논리적인 분석가형
    if (emotionalScore < 0 && planningScore > 0 && valueScore > 0) {
      results.push({
        type: '논리적인 분석가형',
        description: '당신은 논리적이고 체계적인 분석가형 성격을 가진 사람입니다. 객관적 사실을 중시하며, 체계적인 계획을 세워 실행합니다.',
        traits: ['논리적', '체계적', '분석력', '객관성'],
        strengths: ['문제해결력', '계획수립', '분석력', '집중력'],
        weaknesses: ['감정표현 부족', '융통성 부족', '완벽주의'],
        careers: ['연구원', '엔지니어', '데이터 분석가', '컨설턴트']
      })
    }

    // 균형잡힌 조화형
    if (relationshipScore < 0 && activityScore < 0 && planningScore > 0) {
      results.push({
        type: '균형잡힌 조화형',
        description: '당신은 균형감 있고 조화를 추구하는 성격을 가진 사람입니다. 타인과의 관계를 중시하며, 안정적인 환경을 선호합니다.',
        traits: ['조화로움', '안정성', '신뢰성', '배려심'],
        strengths: ['팀워크', '갈등해결', '신뢰성', '안정성'],
        weaknesses: ['주도성 부족', '변화 거부', '의사결정 지연'],
        careers: ['인사담당', '상담사', '교육자', '행정직']
      })
    }

    // 자유로운 영혼형
    if (planningScore < 0 && activityScore > 0 && adventureScore > 0) {
      results.push({
        type: '자유로운 영혼형',
        description: '당신은 자유롭고 창의적인 영혼을 가진 사람입니다. 새로운 경험을 추구하며, 유연하게 상황에 적응합니다.',
        traits: ['자유로움', '창의성', '적응력', '모험심'],
        strengths: ['적응력', '창의력', '도전정신', '유연성'],
        weaknesses: ['책임감 부족', '집중력 부족', '계획성 부족'],
        careers: ['여행작가', '프리랜서', '예술가', '강사']
      })
    }

    // 따뜻한 보호자형
    if (relationshipScore > 0 && emotionalScore > 0 && activityScore < 0) {
      results.push({
        type: '따뜻한 보호자형',
        description: '당신은 따뜻하고 보호적인 성격을 가진 사람입니다. 타인을 돕고 보호하는 것을 좋아하며, 안정적인 관계를 추구합니다.',
        traits: ['배려심', '보호적', '신뢰성', '안정성'],
        strengths: ['돌봄', '신뢰성', '책임감', '인내심'],
        weaknesses: ['자기희생', '과보호', '변화 거부'],
        careers: ['의료인', '상담사', '교육자', '사회복지사']
      })
    }

    // 결과가 없는 경우 기본 유형 반환
    if (results.length === 0) {
      results.push({
        type: '균형잡힌 조화형',
        description: '당신은 균형감 있고 조화를 추구하는 성격을 가진 사람입니다. 타인과의 관계를 중시하며, 안정적인 환경을 선호합니다.',
        traits: ['조화로움', '안정성', '신뢰성', '배려심'],
        strengths: ['팀워크', '갈등해결', '신뢰성', '안정성'],
        weaknesses: ['주도성 부족', '변화 거부', '의사결정 지연'],
        careers: ['인사담당', '상담사', '교육자', '행정직']
      })
    }

    return results
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <div className="test-container">
      <div className="test-header">
        <h1 className="test-title">성격 유형 테스트</h1>
        <button 
          className="home-button"
          onClick={() => navigate('/')}
        >
          메인으로
        </button>
      </div>

      <div className="progress-container">
        <div className="progress-text">
          {currentQuestion + 1} / {questions.length}
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
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