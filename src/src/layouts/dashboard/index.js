import PropTypes from "prop-types";
import { useSections } from "./config";
import { VerticalLayout } from "./vertical-layout";

export const Layout = (props) => {
  const sections = useSections();

  return <VerticalLayout sections={sections} navColor={"evident"} {...props} />;
};

Layout.propTypes = {
  children: PropTypes.node,
};
