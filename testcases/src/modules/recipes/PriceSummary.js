import React from 'react';
import PropTypes from 'prop-types';

import Box from '../../components/Box';
import List from '../../components/List';
import Flex from '../../components/Flex';
import Text from '../../components/Text';
import {parseRawPrice} from '../recipes/price';

// Create PriceSummary user interface
const PriceSummary = ({ baseRecipePrice, shippingPrice, summary, totalPrice, totalSelectedRecipes}) => (
  <Box width={['290px', '450px']} padding="sm" boxShadow="md">
    <List>
      {
        summary.map(item => {
          return <Flex as="li"
              justifyContent="space-between"
              marginBottom="xs"
              key={item.id}
            >
              <Text as="span">
                {item.name}{item.selected > 1 && ` x ${item.selected}`}
              </Text>
              <Text as="span">
                {parseRawPrice(item.selected * (baseRecipePrice + item.extraCharge))}
              </Text>
          </Flex>
        })
      }
      {
        totalSelectedRecipes ?
          <Flex as="li" marginBottom="xs" justifyContent="space-between">
            <Text as="span">{'Shipping charges'}</Text>
            <Text as="span" data-testid="shippingCharges">{parseRawPrice(shippingPrice)}</Text>
          </Flex> :
          null
      }
      {
        totalPrice ? 
        <Flex as="li" borderTopWidth="sm" borderTopColor="neutral_400" borderTopStyle="solid" justifyContent="space-between" paddingTop="xs">
          <Text as="span" fontWeight="bold">{'Total'}</Text>
          <Text as="span" fontWeight="bold" data-testid="totalCharges">{parseRawPrice(totalPrice)}</Text>
        </Flex> :
        <Text as="span">{'Cart is empty!'}</Text>
      }
    </List>
  </Box>
);

PriceSummary.propTypes = {
  baseRecipePrice: PropTypes.number.isRequired,
  shippingPrice: PropTypes.number.isRequired,
  summary: PropTypes.arrayOf(PropTypes.shape),
  totalPrice: PropTypes.number,
  totalSelectedRecipes: PropTypes.number
};

PriceSummary.defaultProps = {
  baseRecipePrice: 0,
  shippingPrice: 0,
};
export default PriceSummary;
