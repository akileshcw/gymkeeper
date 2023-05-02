import Head from "next/head";
import PropTypes from "prop-types";

export const Seo = (props) => {
  const { title } = props;

  const fullTitle = title ? title + " | Raw Fitness GYM" : "Raw Fitness GYM";

  return (
    <Head>
      <title>{fullTitle}</title>
      <link
        rel="shortcut icon"
        href="../../public/assets/GYM/raw_fitness_logo-01.ico"
      />
    </Head>
  );
};

Seo.propTypes = {
  title: PropTypes.string,
};
