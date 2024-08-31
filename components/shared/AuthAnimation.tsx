'use client'
import Lottie from 'lottie-react';
import animationData from '@/assets/auth-animation.json';


function AuthAnimation() {
    return (<Lottie animationData={animationData} loop={true} />);
}

export default AuthAnimation;