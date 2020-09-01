import React from "react";

import { NodeProvider } from "./Context";
import { useSingle } from "./hooks/useSingle";

export const Single = ({ components = {}, ...props }) => {
  const { node, loading, error } = useSingle();

  return (
    <NodeProvider value={{ components, ...props }}>
      {loading || error || !node.id ? (
        <components.ErrorRouting loading={loading} error={error} />
      ) : (
        <React.Fragment>
          <components.SingleTitle {...node} />
          <components.SingleRender node={node} />
        </React.Fragment>
      )}
    </NodeProvider>
  );
};
