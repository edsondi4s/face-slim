import React from 'react';
import { Helmet } from 'react-helmet-async';
import { CONFIG } from '../config';

interface SEOProps {
    title?: string;
    description?: string;
    keywords?: string;
    image?: string;
    url?: string;
}

export const SEO: React.FC<SEOProps> = ({
    title = "Face Slim | Harmonização Facial e Estética Avançada",
    description = "Especialistas em harmonização facial, Face Slim e procedimentos estéticos. Transforme sua beleza com segurança e naturalidade.",
    keywords = "face slim, harmonização facial, estética facial, beleza, emagrecimento facial",
    image = "/og-image.jpg",
    url = window.location.href
}) => {
    return (
        <Helmet>
            {/* Primary Meta Tags */}
            <title>{title}</title>
            <meta name="title" content={title} />
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={url} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={url} />
            <meta property="twitter:title" content={title} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:image" content={image} />

            {/* Google Tag Manager */}
            {CONFIG.tracking.googleTagManagerId && (
                <script>
                    {`
                    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                    })(window,document,'script','dataLayer','${CONFIG.tracking.googleTagManagerId}');
                    `}
                </script>
            )}

            {/* Meta Pixel Code */}
            {CONFIG.tracking.metaPixelId && (
                <script>
                    {`
                    !function(f,b,e,v,n,t,s)
                    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                    n.queue=[];t=b.createElement(e);t.async=!0;
                    t.src=v;s=b.getElementsByTagName(e)[0];
                    s.parentNode.insertBefore(t,s)}(window, document,'script',
                    'https://connect.facebook.net/en_US/fbevents.js');
                    fbq('init', '${CONFIG.tracking.metaPixelId}');
                    fbq('track', 'PageView');
                    `}
                </script>
            )}
            {CONFIG.tracking.metaPixelId && (
                <noscript>
                    {`
                    <img height="1" width="1" style="display:none"
                    src="https://www.facebook.com/tr?id=${CONFIG.tracking.metaPixelId}&ev=PageView&noscript=1" />
                    `}
                </noscript>
            )}
        </Helmet>
    );
};

