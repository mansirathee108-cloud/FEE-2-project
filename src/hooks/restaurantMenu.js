const restaurantMenus = {
  Greggs: [
    "Gregg's Chicken Bake",
    'Vedal special Chicken Bake',
    'Choco chip cookie',
    'Strawberry cookie',
    'Strawberry tart',
    'Sausage roll',
    'Cheese and onion bake',
    'Chocolate brownie',
  ],
  McNeuros: ['Cookies', 'Neuro burger', 'Neuro fries', 'Milkshake'],
  McCrelly: ['McCrelly combo', 'McCrelly double combo', 'Crelly fries', 'Crelly shake'],
  "Vedal's rum factory": [
    'Rum',
    'Rum',
    'Rum',
    'Beer',
    'Wine',
    'Champaigne',
    'Rum',
    'Spiced rum',
    'Rum tasting flight',
    'Rum punch',
  ],
};

export default function useRestaurantMenu(restaurantName) {
  return restaurantMenus[restaurantName] ?? [];
}