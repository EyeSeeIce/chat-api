import express from 'express'
import cors from 'cors'
import { Configuration, OpenAIApi } from 'openai';

const apiKey = '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'

const configuration = new Configuration({
    apiKey: apiKey,
});
const openai = new OpenAIApi(configuration);

const app = express()

app.use(
  cors({
      origin: '*',
  }),
)

app.use(express.json())
app.use(express.urlencoded({ extended: false }))




app.post('/api/v1/description', async (req, res) => {
    try {
        const request = req.body.text
        const answer = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: request,
            temperature: 1,
            max_tokens: 1200,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        });

        res.send({
            text: answer.data.choices[0].text
        })
    } catch(Error) {
        console.log(Error)
        return res.status(400).send({
            message: Error.message
        })
    }
})

app.listen(4000, async () => {
    try {
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})