import React from 'react';
import { motion, HTMLMotionProps } from 'motion/react';

interface FadeInViewProps extends HTMLMotionProps<"div"> {
    children: React.ReactNode;
    delay?: number;
    direction?: 'up' | 'none';
}

export const FadeInView: React.FC<FadeInViewProps> = ({
    children,
    delay = 0,
    direction = 'up',
    ...props
}) => {
    const variants = {
        hidden: {
            opacity: 0,
            y: direction === 'up' ? 40 : 0,
            scale: props.scale || 1
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.8,
                delay,
                ease: [0.16, 1, 0.3, 1]
            }
        }
    };

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={variants}
            {...props}
        >
            {children}
        </motion.div>
    );
};
