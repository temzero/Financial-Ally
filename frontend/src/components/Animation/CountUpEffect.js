import React from 'react';
import { useSpring, animated } from 'react-spring';

const CountUpEffect = ({ n, duration = 1000 }) => {
    const { number } = useSpring({
        from: { number: 0 },
        number: n,
        delay: 100, 
        config: { duration },
    });

    return (
        <animated.div>
            {number.to(n => n.toLocaleString())}
        </animated.div>
    );
};

export default CountUpEffect;