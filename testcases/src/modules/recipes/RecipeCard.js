import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import css from '@styled-system/css';

import Flex from '../../components/Flex';
import Box from '../../components/Box';
import Text from '../../components/Text';
import Button from '../../components/Button';
import IconMinusCircle from '../../icons/IconMinusCircle';
import IconPlusCircle from '../../icons/IconPlusCircle';
import { parseRawPrice } from './price';

const RecipeCard = ({
  extraCharge,
  handleAddRecipe,
  handleRemoveRecipe,
  headline,
  id,
  image,
  isButtonDisabled,
  isExtra,
  isMaxRecipesSelected,
  isMinRecipesSelected,
  name,
  selected,
  yields,
}) => (
  <Box
    borderWidth={selected ? 'md' : null}
    borderStyle={selected ? 'solid' : null}
    borderColor={selected ? 'primary_600' : null}
    m={selected ? '-2px' : null}
    borderRadius="md"
    boxShadow="lg">
    <Box borderRadius="2px 2px 0px 0px" paddingBottom="56.25%" overflow="hidden" height="0">
      <img src={image} alt={name} width="100%" />
    </Box>

    <Box p="xs" height="120px">
      <Text fontWeight="bold" fontFamily="primary" fontSize="md">
        {name}
      </Text>
      <Text fontWeight="regular" fontFamily="secondary" fontSize="sm">
        {headline}
      </Text>
    </Box>
    {selected ? (
      <SelectedRecipeFooter
        handleAddRecipe={handleAddRecipe}
        handleRemoveRecipe={handleRemoveRecipe}
        isButtonDisabled={isButtonDisabled}
        isMaxRecipesSelected={isMaxRecipesSelected}
        recipeId={id}
        selected={selected}
        yields={yields}
      />
    ) : (
      <UnselectedRecipeFooter
        handleAddRecipe={handleAddRecipe}
        isExtra={isExtra}
        isMaxRecipesSelected={isMaxRecipesSelected}
        isMinRecipesSelected={isMinRecipesSelected}
        price={extraCharge}
        recipeId={id}
        selected={selected}
      />
    )}
  </Box>
);

RecipeCard.propTypes = {
  extraCharge: PropTypes.number,
  handleAddRecipe: PropTypes.func,
  handleRemoveRecipe: PropTypes.func,
  headline: PropTypes.string,
  id: PropTypes.string,
  image: PropTypes.string,
  isButtonDisabled: PropTypes.bool,
  isExtra: PropTypes.bool,
  isMaxRecipesSelected: PropTypes.bool,
  isMinRecipesSelected: PropTypes.bool,
  name: PropTypes.string,
  selected: PropTypes.number,
  yields: PropTypes.number,
};

const UnselectedRecipeFooter = ({
  isExtra,
  price,
  recipeId,
  isMaxRecipesSelected,
  handleAddRecipe,
}) => (
  <Flex p="xs">
    <Box flex="50%" alignSelf="center">
      {price ? <Text color="primary_600">+{parseRawPrice(price)}</Text> : null}
    </Box>
    <Box flex="50%">
      <Button
        onClick={() => handleAddRecipe(recipeId)}
        variant="secondary"
        width="100%"
        p="0"
        disabled={isMaxRecipesSelected}>
        {isExtra ? 'Add extra meal' : 'Add'}
      </Button>
    </Box>
  </Flex>
);

UnselectedRecipeFooter.propTypes = {
  isExtra: PropTypes.bool,
  price: PropTypes.number,
  recipeId: PropTypes.string,
  isMaxRecipesSelected: PropTypes.bool,
  handleAddRecipe: PropTypes.func,
};

const SelectedRecipeFooter = ({
  recipeId,
  selected,
  isButtonDisabled,
  yields,
  isMaxRecipesSelected,
  handleAddRecipe,
  handleRemoveRecipe,
}) => (
  <Flex backgroundColor="primary_600" justifyContent="space-between" alignItems="center">
    <SelectionButton onClick={() => handleRemoveRecipe(recipeId)} title="Decrease quantity">
      <IconMinusCircle />
    </SelectionButton>
    <Box color="white">
      <Text textAlign="center" fontWeight="bold" fontFamily="secondary" fontSize="md">
        {selected} in your box
      </Text>
      <Text textAlign="center" fontFamily="secondary" fontSize="sm">
        ({selected * yields} servings)
      </Text>
    </Box>
    <SelectionButton onClick={() => handleAddRecipe(recipeId)} title="Increase quantity" disabled={isMaxRecipesSelected || isButtonDisabled}>
      <IconPlusCircle />
    </SelectionButton>
  </Flex>
);

SelectedRecipeFooter.propTypes = {
  recipeId: PropTypes.string,
  selected: PropTypes.number,
  yields: PropTypes.number,
  isMaxRecipesSelected: PropTypes.bool,
  handleAddRecipe: PropTypes.func,
  handleRemoveRecipe: PropTypes.func,
};

const SelectionButton = styled.button`
  ${css({
    outline: 'none',
    color: 'white',
    padding: 'sm',
    cursor: 'pointer',
    backgroundColor: 'primary_600',
    border: 'none',
    ':hover:enabled': {
      backgroundColor: 'primary_700',
    },
    ':active:enabled': {
      backgroundColor: 'primary_800',
    },
  })}
  &:disabled {
    cursor: default;
    opacity: 0.5;
  }
`;

export default RecipeCard;
