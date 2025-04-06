import birdAnimation from './assets/Bird-Lottie.json';
import Lottie from 'react-lottie';
import { memo } from 'react';

export default memo(function Birds(props) {
  const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData: birdAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div className="absolute inset-0 -z-10">
      <div className="absolute top-1 left-2 hidden sm:block">
        <Lottie options={lottieOptions} height={80} width={80} speed={0.4} />
      </div>{' '}
      <div className="absolute top-16 left-20">
        <Lottie options={lottieOptions} height={60} width={60} speed={0.4} />
      </div>
      <div className="absolute top-40 left-54 hidden sm:block">
        <Lottie options={lottieOptions} height={75} width={75} speed={0.4} />
      </div>
      <div className="absolute top-1 right-2 hidden sm:block">
        <Lottie options={lottieOptions} height={50} width={50} speed={0.4} />
      </div>{' '}
      <div className="absolute top-12 right-20">
        <Lottie options={lottieOptions} height={85} width={85} speed={0.4} />
      </div>
      <div className="absolute top-40 right-40 hidden sm:block">
        <Lottie options={lottieOptions} height={70} width={70} speed={0.4} />
      </div>
    </div>
  );
});
