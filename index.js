import express from 'express'
import cors from 'cors'
import { Configuration, OpenAIApi } from 'openai';

const localApiKey = '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'
const devApiKey = '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'

const configuration = new Configuration({
    apiKey: devApiKey,
    organization: 'org-9YIixBIMfoocaSVbrp5eb0up',

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
        console.log(request)
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

app.listen(4001, async () => {
    try {
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})