import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './App.css';

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
];

function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showCopied, setShowCopied] = useState(false);
  const result = location.state?.result || personalityTypes[0];

  const handleShare = () => {
    const shareText = `✨ ${result.type} 성격유형 테스트 결과 ✨\n\n${result.description}\n\n특징: ${result.traits.join(', ')}\n\n강점: ${result.strengths.join(', ')}\n\n약점: ${result.weaknesses.join(', ')}\n\n추천 직업: ${result.careers.join(', ')}\n\n#성격유형테스트 #${result.type} #MBTI #심리테스트`;
    navigator.clipboard.writeText(shareText);
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2000);
  };

  return (
    <div className="main-container">
      <div className="result-header">
        <button onClick={() => navigate('/')} className="back-button">
          ← 메인으로
        </button>
        <h2>성격 유형 테스트 결과</h2>
      </div>

      <div className="instagram-result-container">
        <div className="instagram-card">
          <div className="instagram-header">
            <div className="profile">
              <span className="profile-pic">🧠</span>
              <div className="profile-info">
                <div className="username">성격유형 테스트</div>
                <div className="location">심리테스트</div>
              </div>
            </div>
            <button className="share-button" onClick={handleShare}>
              {showCopied ? '복사됨!' : '공유하기'}
            </button>
          </div>

          <div className="instagram-content">
            <div className="result-emoji">✨</div>
            <div className="result-title">{result.type}</div>
            <div className="result-desc">{result.description}</div>

            <div className="instagram-grid">
              <div className="grid-item">
                <h4>특징</h4>
                <div className="traits">
                  {result.traits.map((trait, index) => (
                    <span key={index} className="trait-tag">🎯 {trait}</span>
                  ))}
                </div>
              </div>

              <div className="grid-item">
                <h4>강점</h4>
                <div className="traits">
                  {result.strengths.map((strength, index) => (
                    <span key={index} className="trait-tag">💪 {strength}</span>
                  ))}
                </div>
              </div>

              <div className="grid-item">
                <h4>약점</h4>
                <div className="traits">
                  {result.weaknesses.map((weakness, index) => (
                    <span key={index} className="trait-tag">⚠️ {weakness}</span>
                  ))}
                </div>
              </div>

              <div className="grid-item">
                <h4>추천 직업</h4>
                <div className="traits">
                  {result.careers.map((career, index) => (
                    <span key={index} className="trait-tag">💼 {career}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="instagram-footer">
            <div className="hashtags">
              #성격유형테스트 #{result.type} #MBTI #심리테스트
            </div>
            <button className="retry-button" onClick={() => navigate('/test')}>
              다시 테스트하기
            </button>
          </div>
        </div>
      </div>

      <div className="ad-banner">
        <ins 
          className="kakao_ad_area" 
          style={{ display: 'block', width: '100%', textAlign: 'center' }}
          data-ad-unit="DAN-rz0SXdqQnXMRUyny"
          data-ad-width="320"
          data-ad-height="100"
        />
      </div>
    </div>
  );
}

export default ResultPage; 