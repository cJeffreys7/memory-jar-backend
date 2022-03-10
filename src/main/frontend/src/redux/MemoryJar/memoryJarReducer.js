import memoryJarTypes from "./memoryJarTypes";

const INITIAL_STATE = {
    currentMemoryJar: null
};

const memoryJarReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case memoryJarTypes.SET_CURRENT_MEMORY_JAR:
            return {
                ...state,
                currentMemoryJar: action.payload
            };
        default:
            return state;
    };
};

export default memoryJarReducer;