import { createTheme } from "@material-ui/core/styles";

import variants from "./variants";
import typography from "./typography";
import overrides from "./overrides";
import breakpoints from "./breakpoints";
import props from "./props";
import shadows from "./shadows";

export const Themes = (index, dir) => {
  const variant = variants[index];

  return createTheme(
    {
      spacing: 4,
      breakpoints: breakpoints,
      overrides: overrides,
      props: props,
      typography: typography,
      shadows: shadows,
      body: variant.body,
      header: variant.header,
      palette: variant.palette,
      sidebar: variant.sidebar,
      direction: dir,
    },
    variant.name
  );
};
