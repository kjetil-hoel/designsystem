/* eslint-disable @next/next/no-img-element */
import type React from 'react';
import { useEffect, useState, createElement } from 'react';
import cn from 'clsx';

import { Container } from '../Container/Container';

import classes from './ImageBanner.module.css';

interface ImageSectionProps {
  title?: string;
  description?: string;
  imgSrc?: string;
  videoSrc?: string;
  imgAlt?: string;
  headingLevel?: 'h1' | 'h2';
  content?: React.ReactNode;
  children?: React.ReactNode;
  imgWidth: string;
  backgroundColor?: 'blue' | 'yellow' | 'red' | 'white';
  buttons?: ImageSectionButtonProps[];
  link?: { text: string; href: string; prefix: React.ReactNode };
  imgPosition?: 'left' | 'right';
  region?: React.ReactNode;
  regionPosition?: 'topLeft' | 'bottomLeft' | 'topRight' | 'bottomRight';
  fallbackImgSrc: string;
  fallbackImgAlt: string;
}

type ImageSectionButtonProps = {
  text: string;
  prefix?: React.ReactNode;
  href: string;
};

const ImageBanner = ({
  title,
  description,
  imgSrc,
  videoSrc,
  content,
  imgWidth,
  backgroundColor = 'white',
  children,
  buttons,
  link,
  imgPosition = 'left',
  imgAlt = '',
  headingLevel = 'h1',
  fallbackImgSrc,
  fallbackImgAlt,
}: ImageSectionProps) => {
  const [heading, setHeading] = useState<React.ReactNode | null>(null);

  useEffect(() => {
    setHeading(
      createElement(headingLevel, { className: classes.title }, title),
    );
  }, [headingLevel, title]);

  return (
    <div className={(classes[backgroundColor], classes.section)}>
      <Container className={cn(classes.container)}>
        {imgPosition === 'left' && (
          <div
            className={cn(classes.imgContainer, {
              [classes.smallImage]: imgWidth === 'small',
            })}
          >
            {videoSrc && (
              <video
                autoPlay
                playsInline
                muted
                loop
                className={classes.video}
              >
                <source
                  src={videoSrc + '.webm'}
                  type='video/webm'
                />
                <source
                  src={videoSrc + '.mp4'}
                  type='video/mp4'
                />
              </video>
            )}
            {imgSrc && (
              <img
                className={cn(classes.img)}
                src={imgSrc}
                alt={imgAlt}
              />
            )}
            {fallbackImgSrc && (
              <img
                className={cn(classes.img, classes.fallbackImg)}
                src={fallbackImgSrc}
                alt={fallbackImgAlt}
              />
            )}
          </div>
        )}

        <div className={classes.textContainer}>
          {title && heading}
          {description && <p className={classes.desc}>{description}</p>}
          {content && content}
          {link && (
            <a
              href={link.href}
              className={classes.link}
            >
              {link.prefix} {link.text}
            </a>
          )}

          {buttons && (
            <div className={classes.buttons}>
              {buttons.map((item, index) => (
                <a
                  href={item.href}
                  className={classes.button}
                  key={index}
                >
                  {item.prefix}
                  {item.text}
                </a>
              ))}
            </div>
          )}

          {children}
        </div>
        {imgPosition === 'right' && (
          <div className={classes.imgContainer}>
            {videoSrc && (
              <video
                autoPlay
                playsInline
                muted
                loop
                className={classes.video}
              >
                <source
                  src={videoSrc + '.webm'}
                  type='video/webm'
                />
                <source
                  src={videoSrc + '.mp4'}
                  type='video/mp4'
                />
              </video>
            )}
            {imgSrc && (
              <img
                className={cn(classes.img)}
                alt={imgAlt}
                src={imgSrc}
              />
            )}
            {fallbackImgSrc && (
              <img
                className={cn(classes.img, classes.fallbackImg)}
                src={fallbackImgSrc}
                alt={fallbackImgAlt}
              />
            )}
          </div>
        )}
      </Container>
    </div>
  );
};

export type { ImageSectionButtonProps, ImageSectionProps };
export { ImageBanner };
