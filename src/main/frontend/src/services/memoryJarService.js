import axios from "axios"

const getJar = (jarId) => {

}

const getJarsByOwner = async (owner) => {
    try {
        const result = axios.get(
            `http://localhost:8080/jars/${owner}`,
            {
                headers: {
                    "Access-Control-Allow-Origin": "*"
                }
            }
        );
        return result;
    } catch (err) {
        console.log('Failed to get Jars by Owner: ', err);
    }
}

const saveJar = async (memoryJarData) => {
    try {
        const result = axios.post('http://localhost:8080/jar', memoryJarData);
        console.log('New Memory Jar created: ', result);
        return true;
    } catch (err) {
        console.log('Failed to create Memory Jar: ', err);
        return false;
    }
}

export {
    getJar,
    getJarsByOwner,
    saveJar
}