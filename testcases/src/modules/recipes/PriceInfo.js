import React from 'react';

import IconButton from '../../components/IconButton';
import IconInfoCircle from '../../icons/IconInfoCircle';
import Tooltip, { TooltipContainer } from '../../components/Tooltip';
import PriceSummary from './PriceSummary';
import useOnClickOutside from '../../hooks/useOnClickOutside';

const PriceInfo = ({ baseRecipePrice, shippingPrice, summary, totalPrice, totalSelectedRecipes }) => {
  const ref = React.useRef();
  const [isTooltipOpen, setTooltipOpen] = React.useState(false);
  // Close on click outside of the tooltip
  useOnClickOutside(ref, () => setTooltipOpen(false));

  return (
    <TooltipContainer ref={ref}>
      <IconButton onClick={() => setTooltipOpen(!isTooltipOpen)}>
        <IconInfoCircle size="20" />
      </IconButton>
      {isTooltipOpen ? (
        <Tooltip>
          <PriceSummary
            baseRecipePrice={baseRecipePrice}
            shippingPrice={shippingPrice}
            summary={summary}
            totalPrice={totalPrice}
            totalSelectedRecipes={totalSelectedRecipes}
          />
        </Tooltip>
      ) : null}
    </TooltipContainer>
  );
};

export default PriceInfo;
