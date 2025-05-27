import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './App.css';

const personalityTypes = {
  'ISTJ': {
    type: '청렴결백한 논리주의자',
    description: '사실에 근거하여 신중하고 논리적으로 판단하는 성격 유형입니다.',
    traits: ['신중함', '책임감', '논리적', '체계적'],
    strengths: ['신뢰성', '성실성', '실용성', '집중력'],
    weaknesses: ['유연성 부족', '감정 표현 서툼', '완벽주의'],
    careers: ['회계사', '법률가', '군인', '프로젝트 매니저']
  },
  'ISFJ': {
    type: '용감한 수호자',
    description: '성실하고 따뜻한 마음을 가진 수호자형 성격입니다.',
    traits: ['배려심', '성실성', '인내심', '협력적'],
    strengths: ['책임감', '관리 능력', '실용성', '공감 능력'],
    weaknesses: ['자기주장 부족', '변화 싫어함', '과도한 헌신'],
    careers: ['간호사', '교사', '상담사', '행정직']
  },
  'INFJ': {
    type: '선의의 옹호자',
    description: '차분하고 신비한 성격으로, 타인의 성장을 돕고자 하는 성격입니다.',
    traits: ['이상주의', '창의성', '통찰력', '결단력'],
    strengths: ['통찰력', '창의성', '설득력', '헌신성'],
    weaknesses: ['완벽주의', '과민성', '고립 선호'],
    careers: ['상담사', '작가', '교사', '심리학자']
  },
  'INTJ': {
    type: '용의주도한 전략가',
    description: '논리적이고 창의적인 성격으로, 혁신적인 해결책을 찾는 성격입니다.',
    traits: ['전략적', '독창적', '논리적', '결단력'],
    strengths: ['창의성', '전략적 사고', '독립성', '지적 호기심'],
    weaknesses: ['고집', '완벽주의', '타인 비판'],
    careers: ['과학자', '엔지니어', '변호사', '컨설턴트']
  },
  'ISTP': {
    type: '만능 재주꾼',
    description: '대담하고 현실적인 성격으로, 도구 사용에 능숙한 성격입니다.',
    traits: ['모험심', '실용성', '관찰력', '적응력'],
    strengths: ['문제해결력', '위기대처능력', '실용성', '관찰력'],
    weaknesses: ['감정 표현 서툼', '규칙 싫어함', '헌신 부족'],
    careers: ['기계공학자', '파일럿', '운동선수', '건축가']
  },
  'ISFP': {
    type: '호기심 많은 예술가',
    description: '따뜻한 감성을 가진 성격으로, 현재의 삶을 즐기는 성격입니다.',
    traits: ['예술성', '감수성', '자유로움', '관용'],
    strengths: ['예술적 감각', '공감 능력', '적응력', '관찰력'],
    weaknesses: ['계획성 부족', '갈등 회피', '자기주장 부족'],
    careers: ['디자이너', '음악가', '요리사', '수의사']
  },
  'INFP': {
    type: '열정적인 중재자',
    description: '이상적인 세상을 추구하는 성격으로, 창의적이고 공감능력이 뛰어납니다.',
    traits: ['이상주의', '창의성', '공감능력', '헌신'],
    strengths: ['창의성', '공감능력', '헌신성', '통찰력'],
    weaknesses: ['현실감 부족', '완벽주의', '감정적'],
    careers: ['작가', '상담사', '교사', '심리학자']
  },
  'INTP': {
    type: '논리적인 사색가',
    description: '지적 호기심이 많은 성격으로, 이론과 원리를 탐구하는 성격입니다.',
    traits: ['논리적', '창의적', '객관적', '분석적'],
    strengths: ['논리적 사고', '창의성', '객관성', '지적 호기심'],
    weaknesses: ['감정 표현 서툼', '완벽주의', '고립 선호'],
    careers: ['과학자', '프로그래머', '철학자', '연구원']
  },
  'ESTP': {
    type: '모험을 즐기는 사업가',
    description: '활동적이고 에너지 넘치는 성격으로, 위험을 즐기는 성격입니다.',
    traits: ['모험심', '실용성', '적응력', '관찰력'],
    strengths: ['위기대처능력', '실용성', '적응력', '관찰력'],
    weaknesses: ['인내심 부족', '규칙 싫어함', '장기계획 부족'],
    careers: ['기업가', '영업직', '마케터', '운동선수']
  },
  'ESFP': {
    type: '자유로운 영혼의 연예인',
    description: '즉흥적이고 활동적인 성격으로, 주변 사람들을 즐겁게 하는 성격입니다.',
    traits: ['즐거움', '친근함', '즉흥성', '관용'],
    strengths: ['사교성', '적응력', '낙천성', '공감능력'],
    weaknesses: ['계획성 부족', '집중력 부족', '규칙 싫어함'],
    careers: ['연예인', '이벤트 플래너', '요리사', '여행가']
  },
  'ENFP': {
    type: '재기발랄한 활동가',
    description: '열정적이고 창의적인 성격으로, 새로운 가능성을 찾는 성격입니다.',
    traits: ['열정', '창의성', '사교성', '상상력'],
    strengths: ['창의성', '사교성', '적응력', '통찰력'],
    weaknesses: ['집중력 부족', '일상 싫어함', '감정적'],
    careers: ['기자', '상담사', '마케터', '교사']
  },
  'ENTP': {
    type: '논쟁을 즐기는 변론가',
    description: '지적 도전을 즐기는 성격으로, 창의적인 해결책을 찾는 성격입니다.',
    traits: ['창의성', '논리적', '적응력', '지적 호기심'],
    strengths: ['창의성', '문제해결력', '적응력', '설득력'],
    weaknesses: ['인내심 부족', '규칙 싫어함', '감정 표현 서툼'],
    careers: ['기업가', '변호사', '컨설턴트', '정치인']
  },
  'ESTJ': {
    type: '엄격한 관리자',
    description: '사실과 원칙을 중시하는 성격으로, 체계적인 관리 능력이 뛰어납니다.',
    traits: ['체계적', '실용적', '책임감', '리더십'],
    strengths: ['조직력', '실용성', '책임감', '결단력'],
    weaknesses: ['유연성 부족', '감정 표현 서툼', '완벽주의'],
    careers: ['경영자', '군인', '회계사', '프로젝트 매니저']
  },
  'ESFJ': {
    type: '사교적인 외교관',
    description: '동정심 많고 협력적인 성격으로, 타인을 돕는 것을 좋아합니다.',
    traits: ['사교성', '협력성', '책임감', '공감능력'],
    strengths: ['사교성', '협력성', '책임감', '공감능력'],
    weaknesses: ['갈등 회피', '비판에 민감', '변화 싫어함'],
    careers: ['교사', '상담사', '인사담당', '간호사']
  },
  'ENFJ': {
    type: '정의로운 사회운동가',
    description: '카리스마 있는 성격으로, 타인의 성장을 돕는 것을 좋아합니다.',
    traits: ['카리스마', '공감능력', '리더십', '헌신'],
    strengths: ['리더십', '공감능력', '설득력', '헌신성'],
    weaknesses: ['비판에 민감', '완벽주의', '과도한 헌신'],
    careers: ['교사', '상담사', '인사담당', '정치인']
  },
  'ENTJ': {
    type: '대담한 통솔자',
    description: '천성적인 리더로, 항상 목표를 향해 전진하는 성격입니다.',
    traits: ['리더십', '전략적', '결단력', '자신감'],
    strengths: ['리더십', '전략적 사고', '결단력', '효율성'],
    weaknesses: ['고집', '감정 표현 서툼', '타인 비판'],
    careers: ['경영자', '변호사', '컨설턴트', '정치인']
  }
};

function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state?.result;
  const [showCopied, setShowCopied] = useState(false);

  if (!result) {
    return (
      <div className="result-container">
        <h2>결과를 찾을 수 없습니다</h2>
        <button onClick={() => navigate('/')}>테스트 다시하기</button>
      </div>
    );
  }

  const handleShare = () => {
    const shareText = `✨ 성격 유형 테스트 결과 ✨\n\n${result.type}\n\n${result.description}\n\n특징\n${result.traits.join(', ')}\n\n강점\n${result.strengths.join(', ')}\n\n약점\n${result.weaknesses.join(', ')}\n\n추천 직업\n${result.careers.join(', ')}\n\n#성격유형 #심리테스트 #MBTI`;
    navigator.clipboard.writeText(shareText);
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2000);
  };

  return (
    <div className="result-container">
      <div className="result-card">
        <h2 className="result-type">{result.type}</h2>
        <p className="result-description">{result.description}</p>

        <div className="result-section">
          <h3>특징</h3>
          <div className="traits-container">
            {result.traits.map((trait, index) => (
              <span key={index} className="trait-tag">{trait}</span>
            ))}
          </div>
        </div>

        <div className="result-section">
          <h3>강점</h3>
          <ul className="result-list">
            {result.strengths.map((strength, index) => (
              <li key={index}>{strength}</li>
            ))}
          </ul>
        </div>

        <div className="result-section">
          <h3>약점</h3>
          <ul className="result-list">
            {result.weaknesses.map((weakness, index) => (
              <li key={index}>{weakness}</li>
            ))}
          </ul>
        </div>

        <div className="result-section">
          <h3>추천 직업</h3>
          <div className="careers-container">
            {result.careers.map((career, index) => (
              <span key={index} className="career-tag">{career}</span>
            ))}
          </div>
        </div>

        <div className="result-actions">
          <button 
            className="share-button" 
            onClick={handleShare}
            disabled={!result}
          >
            {showCopied ? '복사됨!' : '결과 공유하기'}
          </button>
          <button 
            className="retry-button" 
            onClick={() => navigate('/test')}
          >
            다시하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResultPage; 