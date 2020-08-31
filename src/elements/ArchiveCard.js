import React from "react";
import { Link } from "react-router-dom";

import { useComponents } from "../hooks/useComponents";

export const ArchiveCard = ({
  databaseId,
  uri,
  title,
  dateFormatted,
  excerpt,
  content,
}) => {
  const { components } = useComponents();

  return (
    <article
      className={`content blog-entry b--near-white bb pb4 mb4 post-${databaseId}`}
    >
      <h2 className="mt0">
        <Link to={uri}>{title}</Link>
        <div className="posted fr-ns mt2 mt0-ns f6">
          <components.ClockIcon className="v-mid mr2" width={12} height={12} />
          <span>{dateFormatted}</span>
        </div>
      </h2>

      <components.PostContent className="mv4" trim={true}>
        {excerpt || content}
      </components.PostContent>

      <div className="tr">
        <components.Button to={uri} type={3}>
          Read more
        </components.Button>
      </div>
    </article>
  );
};
