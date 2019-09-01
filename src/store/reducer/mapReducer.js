import { CITY_SET } from "../actionTypes";

const defaultState = {
  cityName: "xxx..."
}
export default (state = defaultState, action) => {
  const {value,type}=action;
  let newState=JSON.parse(JSON.stringify(state));
  switch (type) {
    case CITY_SET:
      newState.cityName=value;
      console.log(newState);
      return newState;
      break;
  
    default:
      break;
  }
  
  
   return state 
  };