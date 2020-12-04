import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://firestore.googleapis.com/v1/projects/mindmap-app-d9302/databases/(default)/documents/'
});

export default instance; 