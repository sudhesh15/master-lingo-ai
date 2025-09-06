import axios from 'axios';

export async function GET() {
    const response = await axios.post(
        "https://api.openai.com/v1/realtime/sessions",
        {
            model: "gpt-realtime",
            modalities: ["audio", "text"],
        },
        {
            headers: {
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            },
        }
    );

    console.log("Response from OpenAI:", response.data);

    return Response.json({ tempApiKey: response.data.client_secret.value });
}