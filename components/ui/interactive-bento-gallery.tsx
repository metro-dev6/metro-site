"use client"
import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ImageComparison } from "@/components/ui/image-comparison";

interface MediaItemType {
    id: number;
    type: "image" | "video" | "comparison";
    title: string;
    desc: string;
    url: string;
    span: string;
    beforeUrl?: string;
    afterUrl?: string;
    objectPosition?: string;
    beforeObjectPosition?: string;
    afterObjectPosition?: string;
}

const MediaItem = ({ item, className }: { item: MediaItemType, className?: string }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isInView, setIsInView] = useState(false);
    const [isBuffering, setIsBuffering] = useState(true);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => entries.forEach(e => setIsInView(e.isIntersecting)),
            { root: null, rootMargin: '50px', threshold: 0.1 }
        );
        if (videoRef.current) observer.observe(videoRef.current);
        return () => { if (videoRef.current) observer.unobserve(videoRef.current); };
    }, []);

    useEffect(() => {
        let mounted = true;
        const handleVideoPlay = async () => {
            if (!videoRef.current || !isInView || !mounted) return;
            try {
                if (videoRef.current.readyState >= 3) {
                    setIsBuffering(false);
                    await videoRef.current.play();
                } else {
                    setIsBuffering(true);
                    await new Promise((resolve) => {
                        if (videoRef.current) videoRef.current.oncanplay = resolve;
                    });
                    if (mounted) {
                        setIsBuffering(false);
                        await videoRef.current?.play();
                    }
                }
            } catch (error) {
                console.warn("Video playback failed:", error);
            }
        };
        if (isInView) {
            handleVideoPlay();
        } else if (videoRef.current) {
            videoRef.current.pause();
        }
        return () => {
            mounted = false;
            if (videoRef.current) {
                videoRef.current.pause();
                videoRef.current.removeAttribute('src');
                videoRef.current.load();
            }
        };
    }, [isInView]);

    if (item.type === 'video') {
        return (
            <div className={`${className} relative overflow-hidden`}>
                <video
                    ref={videoRef}
                    className="w-full h-full object-cover object-[center_25%]"
                    playsInline muted loop preload="auto"
                    style={{ opacity: isBuffering ? 0.8 : 1, transition: 'opacity 0.2s', transform: 'translateZ(0)', willChange: 'transform' }}
                >
                    <source src={item.url} type="video/mp4" />
                </video>
                {isBuffering && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    </div>
                )}
            </div>
        );
    }

    if (item.type === 'comparison') {
        return (
            <div className={`${className} relative overflow-hidden`}>
                <ImageComparison
                    before={{ src: item.beforeUrl!, alt: `${item.title} before` }}
                    after={{ src: item.afterUrl!, alt: `${item.title} after` }}
                    initialPosition={75}
                    fillContainer
                    beforeObjectPosition={item.beforeObjectPosition}
                    afterObjectPosition={item.afterObjectPosition}
                />
            </div>
        );
    }

    return (
        <img
            src={item.url}
            alt={item.title}
            className={`${className} object-cover`}
            style={item.objectPosition ? { objectPosition: item.objectPosition } : undefined}
            loading="lazy"
            decoding="async"
        />
    );
};

interface InteractiveBentoGalleryProps {
    mediaItems: MediaItemType[]
    title?: string
    description?: string
}

const InteractiveBentoGallery: React.FC<InteractiveBentoGalleryProps> = ({ mediaItems, title, description }) => {
    return (
        <div className="w-full py-8">
            {(title || description) && (
                <div className="mb-8 text-center">
                    <motion.h1
                        className="text-2xl sm:text-3xl md:text-4xl font-bold text-white"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {title}
                    </motion.h1>
                    <motion.p
                        className="mt-2 text-sm sm:text-base text-white/50"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        {description}
                    </motion.p>
                </div>
            )}

            <motion.div
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 auto-rows-[60px]"
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
                }}
            >
                {mediaItems.map((item, index) => (
                    <motion.div
                        key={item.id}
                        className={`group relative overflow-hidden rounded-xl ${item.span}`}
                        variants={{
                            hidden: { y: 50, scale: 0.9, opacity: 0 },
                            visible: {
                                y: 0, scale: 1, opacity: 1,
                                transition: { type: "spring", stiffness: 350, damping: 25, delay: index * 0.05 }
                            }
                        }}
                    >
                        <MediaItem
                            item={item}
                            className="absolute inset-0 w-full h-full"
                        />
                        {item.type !== 'comparison' && (
                            <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 md:p-4 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                                <h3 className="text-white text-xs sm:text-sm font-medium line-clamp-1">{item.title}</h3>
                                <p className="text-white/70 text-[10px] sm:text-xs mt-0.5 line-clamp-1">{item.desc}</p>
                            </div>
                        )}
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};

export default InteractiveBentoGallery
