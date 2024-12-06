import React, { useState, useEffect } from 'react';
import GuideModal from './components/GuideModal';

function App() {
    const [isGuideOpen, setIsGuideOpen] = useState(false);

    useEffect(() => {
        if (!localStorage.getItem('guideShown')) {
            setIsGuideOpen(true);
            localStorage.setItem('guideShown', 'true');
        }
    }, []);

    return (
        <div className="container">
            <div className="header">
                <h1>보건소 알림e</h1>
            </div>
            <div className="content">
                <div className="controls">
                    <button 
                        className="controls__item"
                        onClick={() => setIsGuideOpen(true)}
                    >
                        ?
                    </button>
                    <button className="controls__item">고대비</button>
                </div>
                <div className="content__item">
                    <a href="/pages/disez_list.html" className="content__item__link">질병/질환 목록</a>
                    <a href="/pages/age_list.html" className="content__item__link">연령별 검사 안내</a>
                    <a href="/pages/location.html" className="content__item__link">가까운 보건소 찾기</a>
                    <a href="/pages/service.html" className="content__item__link">진료 예약</a>
                    <a href="/pages/test_list.html" className="content__item__link">검사 결과 조회</a>
                </div>
            </div>

            <GuideModal 
                isOpen={isGuideOpen} 
                onClose={() => setIsGuideOpen(false)} 
            />
        </div>
    );
}

export default App;
