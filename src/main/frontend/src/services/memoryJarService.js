import axios from "axios"

const getJar = (jarId) => {
    try {
        const result = axios.get(`http://localhost:8080/jars/${jarId}`);
        console.log('Memory Jar retrieved: ', result);
        return result;
    } catch (err) {
        console.log('Failed to get Memory Jar: ', err);
        return null;
    }
}

const getJarsByOwner = async (owner) => {
    try {
        const result = axios.get(
            `http://localhost:8080/jars/owner/${owner}`,
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
        const result = axios.post('http://localhost:8080/jars/new', memoryJarData);
        console.log('New Memory Jar created: ', result);
        return true;
    } catch (err) {
        console.log('Failed to create Memory Jar: ', err);
        return false;
    }
}

const saveMemory = async (jarId, memoryData, file) => {
    const fileData = new FormData();
    fileData.append("file", file)
    axios.post(
        `http://localhost:8080/jars/${jarId}/memories/new`,
        fileData,
        {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }
    ).then((result) => {
        console.log('File uploaded successfully! ', result);
    })
    .catch((err) => {
        console.log(err);
    })
    const currentJar = await getJar(jarId);
    const memories = currentJar.data.memories ? currentJar.data.memories : [];
    console.log('Previous Memories: ', memories);
    console.log('New Memory Data: ', memoryData);
    memories.push(memoryData);
    console.log('Current Memories: ', memories);
    currentJar.data.memories = memories;
    console.log('Updated with new Memory: ', currentJar.data);
    // updateJar(jarId, currentJar.data)
}

const updateJar = async (jarId, memoryJarData) => {
    try {
        const result = axios.post(`http://localhost:8080/jars/${jarId}`, memoryJarData);
        console.log('Memory Jar updated: ', result);
        return true;
    } catch (err) {
        console.log('Failed to update Memory Jar: ', err);
        return false;
    }
}

export {
    getJar,
    getJarsByOwner,
    saveJar,
    saveMemory,
    updateJar
}