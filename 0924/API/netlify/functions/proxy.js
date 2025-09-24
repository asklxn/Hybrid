const fetch = require('node-fetch');

exports.handler = async (event, context) => {
    // Netlify 환경 변수에 저장된 API 키를 안전하게 불러옵니다.
    const serviceKey = process.env.API_KEY;
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const searchDate = `${year}-${month}-${day}`;

    // 공공데이터 API URL을 만듭니다.
    const url = `https://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMinuDustFrcstDspth?serviceKey=${serviceKey}&returnType=json&numOfRows=100&pageNo=1&searchDate=${searchDate}&informCode=PM10`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        return {
            statusCode: 200,
            body: JSON.stringify(data),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to fetch data from API' }),
        };
    }
};
