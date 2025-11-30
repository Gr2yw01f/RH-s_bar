// client/src/components/Footer.jsx

import React from 'react';

const Footer = () => {
    // 고풍스러운 바 테마 스타일 유지
    const footerStyle = {
        backgroundColor: '#0A0A0A', 
        borderTop: '1px solid #FFD700', 
        color: '#A9A9A9', 
        textAlign: 'center',
        padding: '10px 0',
        fontSize: '0.85em',
        width: '100%',
        position: 'fixed', // 화면 하단 고정
        bottom: 0,
        boxShadow: '0 -2px 5px rgba(0, 0, 0, 0.5)', 
        zIndex: 1000, 
        fontFamily: 'Arial, sans-serif'
    };

    return (
        <footer style={footerStyle}>
            Kim Ryunho 2025. All rights Reserved®
        </footer>
    );
};

export default Footer;