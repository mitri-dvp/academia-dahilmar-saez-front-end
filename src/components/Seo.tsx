import Head from "next/head";
const url = process.env.NEXT_PUBLIC_WEB_URL || "http://localhost:3500";

type SeoProps = {
  title: string;
  description: string;
  titleTemplate?: string;
  image?: string;
  type?: string;
  locale?: string;
  siteLanguage?: string;
  author?: string;
  postSlug?: string;
  copyrightYear?: string;
  datePublished?: string;
  dateModified?: string;
  keywords?: string[];
};

const Seo = (props: SeoProps) => {
  const {
    title = "Academia Dahilmar Saez",
    titleTemplate = "| Academia Dahilmar Saez",
    description = "Academia Dahilmar Saez",
    image = `/academia-dahilmar-saez-share-image.png`,
    type = "website",
    locale = "en_US",
  } = props;

  const metaTitle =
    title === "Academia Dahilmar Saez" ? title : `${title} ${titleTemplate}`;

  return (
    <Head>
      <link rel="icon" href="/favicon.ico" />
      <link rel="canonical" href={url} />
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, user-scalable=no, minimum-scale=1"
      />
      <meta name="msapplication-TileImage" content="/favicon.ico" />
      <meta name="theme-color" content="#dbe021" />
      {title && (
        <>
          <title>{metaTitle}</title>
          <meta property="og:site_name" content={metaTitle} />
          <meta property="og:title" content={metaTitle} />
          <meta name="twitter:title" content={metaTitle} />
        </>
      )}
      {description && (
        <>
          <meta name="description" content={description} />
          <meta property="og:description" content={description} />
          <meta name="twitter:description" content={description} />
        </>
      )}
      {image && (
        <>
          <meta property="og:image" content={image} />
          <meta property="og:image:alt" content={description} />
          <meta name="twitter:image" content={image} />
          <meta name="twitter:image:alt" content={description} />
          <meta name="image" content={image} />
        </>
      )}
      {/* Extra Open Graph Tags */}
      {locale && <meta property="og:locale" content={locale} />}
      {type && <meta property="og:type" content={type} />}
      {url && <meta property="og:url" content={url} />}
      <meta name="twitter:card" content="summary_large_image" />
      {/* Remove Indexing, Remove for Production */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
    </Head>
  );
};

export default Seo;
