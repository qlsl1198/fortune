import React, { useEffect } from 'react';

const KakaoAdfit = ({ adUnit }) => {
  useEffect(() => {
    // 카카오 애드핏 스크립트 로드
    const script = document.createElement('script');
    script.src = '//t1.daumcdn.net/kas/static/ba.min.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // 컴포넌트 언마운트 시 스크립트 제거
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="kakao-adfit">
      <ins
        className="kakao_ad_area"
        style={{ display: 'none' }}
        data-ad-unit={adUnit}
        data-ad-width="320"
        data-ad-height="100"
      />
    </div>
  );
};

export default KakaoAdfit; 