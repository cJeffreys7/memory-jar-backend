import axios from "axios"

const baseUrl = 'http://localhost:8080'

const getJar = (jarId) => {
    try {
        const result = axios.get(`${baseUrl}/jars/${jarId}`);
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
            `${baseUrl}/jars/owner/${owner}`,
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
        const result = axios.post(`${baseUrl}/jars/new`, memoryJarData);
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
    let filename = '';
    await axios.post(
        `${baseUrl}/jars/${jarId}/memories/new`,
        fileData,
        {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }
    ).then((result) => {
        console.log('File uploaded successfully! ', result);
        filename = result.data;
    })
    .catch((err) => {
        console.log(err);
    })
    memoryData = {
        ...memoryData,
        type: file.type,
        content: filename
    }
    const currentJar = await getJar(jarId);
    const memories = currentJar.data.memories ? currentJar.data.memories : [];
    memories.push(memoryData);
    currentJar.data.memories = memories;
    const result = await updateJar(jarId, currentJar.data);
    return result;
}

const updateJar = async (jarId, memoryJarData) => {
    try {
        await axios.put(
            `${baseUrl}/jars/${jarId}`,
            memoryJarData
        );
        console.log('Memory Jar updated!');
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