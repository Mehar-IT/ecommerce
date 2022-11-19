import Helmet from "react-helmet";

import React from "react";

export default function MetaData({ title }) {
  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  );
}
