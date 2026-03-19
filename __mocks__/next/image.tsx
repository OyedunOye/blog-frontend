import React from "react";

const NextImage = ({
    src,
    alt,
    ...props
}: {
    src: string;
    alt: string;
    [key: string]: unknown;
}) => {
    return <img src={typeof src === "object" ? "mock-image" : src} alt={alt} {...props} />;
};

export default NextImage;
