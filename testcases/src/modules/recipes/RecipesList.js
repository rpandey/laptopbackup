import React, {useState, useCallback, useEffect} from 'react';

import { Row, Col } from '../../components/Grid';
import Flex from '../../components/Flex';
import Box from '../../components/Box';

import RecipeCard from './RecipeCard';
import PriceInfo from './PriceInfo';

import useFetchHelloFreshBox from '../../hooks/useFetchHelloFreshBox';
import { parseRawPrice } from './price';

// Get the total number of selected recipes from the box
const getselectedList = (recipes) => {
  return recipes.reduce((accumulator, recipes) => {
   return recipes.selected + accumulator;
  }, 0);
};

const Recipes = () => {
  // This state stores the array of recipes with the changes performed by the customer.
  const [recipes, setRecipes] = useState([]);
  const [isExtra, setIsExtra] = useState(false);
  const [totalSelectedRecipes, settotalSelectedRecipes] = useState(0);

  // price summary and total price, feel free to remove or rename these variables and values.
  const [summary, setSummary] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const { data, loading } = useFetchHelloFreshBox();
  const { min: minimumRecipiesRequired, max: maximumRecipiesAllowed, baseRecipePrice, shippingPrice } = data;
  
  // min/max recipe boundaries, feel free to remove or rename these variables and values.
  const isMinRecipesSelected = totalSelectedRecipes === minimumRecipiesRequired;
  const isMaxRecipesSelected = totalSelectedRecipes === maximumRecipiesAllowed;

  // Calculate the total cart value
  const getCartTotalPrice = useCallback((items) => {
    let sum = 0;
    items.forEach(item => sum += item.selected * (baseRecipePrice + item.extraCharge));
    return sum ? sum + shippingPrice : 0;
  }, [baseRecipePrice, shippingPrice]);

  // Update the cart items by filtering the recipes by selected key
  const updateCartItems = useCallback((newRecipes) => {
    const totalSelected = getselectedList(newRecipes);
    settotalSelectedRecipes(totalSelected);

    // Set cart items (when the selected value for that item is greater than zero)
    const cartItems = newRecipes.filter(val=>val.selected > 0);
    setSummary(cartItems);
    
    // Identify the condition to enable 'Add extra' button
    setIsExtra(totalSelected >= minimumRecipiesRequired && totalSelected <= maximumRecipiesAllowed);

    setTotalPrice(getCartTotalPrice(cartItems));
  }, [getCartTotalPrice, maximumRecipiesAllowed, minimumRecipiesRequired]);

  // Add a recipe to cart handler
  const handleAddRecipe = (recipeId) => {
    const newRecipes = recipes.map(rec => {
      if(rec.id === recipeId && ((rec.selected >= 0 && rec.selected < rec.selectionLimit)
        || !rec.selectionLimit)) {
        rec = {...rec, selected: ++rec.selected};
      }
      return rec;
    });

    setRecipes(newRecipes);
    updateCartItems(newRecipes);
  };

  // Remove a recipe from cart handler
  const handleRemoveRecipe = (recipeId) => {
    // Decrement selected recipes
    const newRecipes = recipes.map(rec => {
      if(rec.id === recipeId && rec.selected >0 && baseRecipePrice && shippingPrice) {
        rec = {...rec, selected: --rec.selected};
      }
      return rec;
    });

    setRecipes(newRecipes);
    updateCartItems(newRecipes);
  };

  useEffect(() => {
    const { recipes: fetchedRecipes } = data; 
    if (fetchedRecipes) {
      setRecipes(fetchedRecipes);

      const cartItems = fetchedRecipes.filter(val=>val.selected > 0);
      setSummary(cartItems);
      updateCartItems(fetchedRecipes);
    }
  }, [data, updateCartItems]);

  if (loading) {
    return null;
  }

  return (
    <>
      <Row>
        <Col sm={6}>
          <h3>{data.headline}</h3>
        </Col>
        <Col sm={6}>
          <Flex alignItems="center" justifyContent="flex-end">
            <Box textAlign="right" mr="xs">
              <h3>{parseRawPrice(totalPrice)}</h3>
            </Box>
            <PriceInfo
              baseRecipePrice={baseRecipePrice}
              shippingPrice={shippingPrice}
              summary={summary}
              totalPrice={totalPrice}
              totalSelectedRecipes={totalSelectedRecipes}
              />
          </Flex>
        </Col>
      </Row>

      <Row>
        {recipes.map((recipe) => (
          <Col sm={12} md={6} xl={4} key={recipe.id}>
            <Box mb="md">
              <RecipeCard
                {...recipe}
                handleAddRecipe={handleAddRecipe}
                handleRemoveRecipe={handleRemoveRecipe}
                isButtonDisabled={recipe.selected === recipe.selectionLimit}
                isExtra={isExtra}
                isMaxRecipesSelected={isMaxRecipesSelected}
                isMinRecipesSelected={isMinRecipesSelected}
                totalSelectedRecipes={totalSelectedRecipes}
              />
            </Box>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Recipes;
