import axios from "axios";

const BASE_URL = "http://localhost:9000";

const FestivalService = {
    async fetchTodayFestival() {
        const response = await axios.get(`${BASE_URL}/api/festivalFront/today`);
        return response.data;
    },
    async fetchPastFestivals(offset = 0, limit = 10) {
        const response = await axios.get(`${BASE_URL}/api/festivalFront/past`, {
            params: { offset, limit },
        });
        return response.data;
    },
};

export default FestivalService;
