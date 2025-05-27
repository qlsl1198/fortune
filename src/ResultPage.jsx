import { useLocation, useNavigate } from 'react-router-dom'

const personalityTypes = [
  {
    title: '🌞 활발한 리더형',
    desc: '당신은 에너지 넘치고 리더십이 뛰어난 타입입니다. 새로운 도전을 두려워하지 않고, 주변 사람들을 이끄는 것을 좋아합니다.',
    traits: ['리더십', '활동성', '도전정신', '사교성'],
    strengths: ['문제 해결 능력이 뛰어남', '목표 지향적', '적응력이 좋음', '의사소통 능력이 뛰어남'],
    weaknesses: ['인내심이 부족할 수 있음', '감정적일 수 있음', '완벽주의적 성향'],
    career: ['경영/관리직', '영업직', '강사/교육자', '프로젝트 매니저'],
    relationships: ['직설적이고 솔직한 소통', '활동적인 데이트 선호', '리더 역할 선호']
  },
  {
    title: '🌙 감성적인 예술가형',
    desc: '당신은 섬세한 감성과 창의력을 가진 타입입니다. 예술과 아름다움에 관심이 많으며, 깊이 있는 사고를 합니다.',
    traits: ['감성적', '창의적', '직관적', '이상주의적'],
    strengths: ['창의력이 뛰어남', '공감능력이 좋음', '예술적 감각이 뛰어남', '깊이 있는 통찰력'],
    weaknesses: ['현실감이 부족할 수 있음', '감정에 치우칠 수 있음', '결정을 미루는 경향'],
    career: ['디자이너', '작가', '상담사', '예술가'],
    relationships: ['감성적 교감 중요', '깊이 있는 대화 선호', '로맨틱한 관계 추구']
  },
  {
    title: '💡 논리적인 분석가형',
    desc: '당신은 논리적이고 분석적인 사고방식을 가진 타입입니다. 객관적인 판단과 체계적인 접근을 선호합니다.',
    traits: ['논리적', '분석적', '객관적', '체계적'],
    strengths: ['문제 해결 능력이 뛰어남', '객관적 판단력', '집중력이 좋음', '계획 수립 능력'],
    weaknesses: ['감정 표현이 서툴 수 있음', '완벽주의적 성향', '유연성이 부족할 수 있음'],
    career: ['엔지니어', '과학자', '프로그래머', '분석가'],
    relationships: ['이성적 소통 선호', '신뢰 기반 관계', '개인 공간 중요시']
  },
  {
    title: '🌱 균형잡힌 조화형',
    desc: '당신은 균형과 조화를 중요시하는 타입입니다. 다양한 상황에 잘 적응하며, 타인과의 관계를 소중히 여깁니다.',
    traits: ['균형감', '적응력', '협력적', '배려심'],
    strengths: ['대인관계 능력이 뛰어남', '적응력이 좋음', '조정 능력이 뛰어남', '공감능력이 좋음'],
    weaknesses: ['자기주장이 부족할 수 있음', '갈등 회피 성향', '결정을 미루는 경향'],
    career: ['상담사', '교육자', '인사담당', '고객서비스'],
    relationships: ['조화로운 관계 추구', '타인 배려', '협력적 관계 선호']
  },
  {
    title: '✨ 자유로운 영혼형',
    desc: '당신은 자유롭고 창의적인 영혼을 가진 타입입니다. 새로운 경험을 추구하며, 독창적인 생각을 합니다.',
    traits: ['자유로움', '창의적', '모험적', '독창적'],
    strengths: ['창의력이 뛰어남', '적응력이 좋음', '새로운 시도 두려워하지 않음', '독립적'],
    weaknesses: ['규칙을 싫어함', '책임감이 부족할 수 있음', '일상적인 것에 지루함을 느낌'],
    career: ['예술가', '여행작가', '프리랜서', '창업가'],
    relationships: ['자유로운 관계 추구', '독립적 공간 중요', '새로운 경험 선호']
  },
  {
    title: '💫 따뜻한 보호자형',
    desc: '당신은 따뜻한 마음과 보호 본능을 가진 타입입니다. 타인을 돕고 보호하는 것을 좋아하며, 안정적인 관계를 추구합니다.',
    traits: ['보호적', '배려심', '안정적', '신뢰성'],
    strengths: ['공감능력이 뛰어남', '책임감이 강함', '신뢰성', '보호 본능'],
    weaknesses: ['과보호적일 수 있음', '자기희생적 성향', '변화를 두려워할 수 있음'],
    career: ['의료인', '상담사', '교사', '사회복지사'],
    relationships: ['안정적인 관계 추구', '보호적 관계', '신뢰 기반 관계']
  }
]

export default function ResultPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const answers = location.state?.answers || []

  // 답변을 기반으로 성격 유형 결정
  const getPersonalityType = () => {
    const scores = new Array(personalityTypes.length).fill(0)
    
    answers.forEach((answer, index) => {
      // 각 질문별로 가중치를 다르게 적용
      const weight = Math.floor(index / 2) + 1
      scores[answer] += weight
    })

    return scores.indexOf(Math.max(...scores))
  }

  const personalityType = personalityTypes[getPersonalityType()]

  const handleShare = () => {
    const text = `나의 성격 유형은 "${personalityType.title}"입니다!\n\n${personalityType.desc}\n\n#성격유형테스트 #심리테스트`
    navigator.clipboard.writeText(text)
    alert('결과가 클립보드에 복사되었습니다!')
  }

  return (
    <div className="main-container">
      <div className="result-header">
        <button onClick={() => navigate('/')} className="back-button">
          ← 메인으로
        </button>
        <h2>나의 성격 유형</h2>
      </div>

      <div className="result-container">
        <h3 className="result-title">{personalityType.title}</h3>
        <p className="result-desc">{personalityType.desc}</p>

        <div className="result-section">
          <h4>주요 특성</h4>
          <div className="traits">
            {personalityType.traits.map((trait, index) => (
              <span key={index} className="trait-tag">{trait}</span>
            ))}
          </div>
        </div>

        <div className="result-section">
          <h4>강점</h4>
          <ul>
            {personalityType.strengths.map((strength, index) => (
              <li key={index}>{strength}</li>
            ))}
          </ul>
        </div>

        <div className="result-section">
          <h4>개선할 점</h4>
          <ul>
            {personalityType.weaknesses.map((weakness, index) => (
              <li key={index}>{weakness}</li>
            ))}
          </ul>
        </div>

        <div className="result-section">
          <h4>추천 직업</h4>
          <div className="career-tags">
            {personalityType.career.map((job, index) => (
              <span key={index} className="career-tag">{job}</span>
            ))}
          </div>
        </div>

        <div className="result-section">
          <h4>관계 스타일</h4>
          <ul>
            {personalityType.relationships.map((rel, index) => (
              <li key={index}>{rel}</li>
            ))}
          </ul>
        </div>

        <div className="share-buttons">
          <button onClick={handleShare} className="share-button">
            결과 공유하기
          </button>
          <button onClick={() => navigate('/test')} className="retry-button">
            다시 테스트하기
          </button>
        </div>
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