const initialState = {
  gifts: [],
  giftList: [], // Correction de la clé ici
  loading: false,
  error: null,
};

const reducer = (state, action) => {
  switch (action.type) {
      case "Request":
          return { ...state, loading: true, error: null };
      case "giftSuccess":
          return {
              ...state,
              loading: false,
              gifts: action.payload,
          };
      case "giftError":
          return {
              ...state,
              loading: false,
              error: action.payload,
          };
      case "giftsListSuccess":
          return {
              ...state,
              loading: false,
              giftList: action.payload, // Correction de la clé ici
          };
      case "giftsListError":
          return {
              ...state,
              loading: false,
              error: action.payload,
          };
      default:
          return state;
  }
};

export { initialState, reducer };
