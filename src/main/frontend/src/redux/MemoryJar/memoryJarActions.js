import memoryJarTypes from "./memoryJarTypes";

export const setCurrentMemoryJar = memoryJar => ({
    type: memoryJarTypes.SET_CURRENT_MEMORY_JAR,
    payload: memoryJar
})