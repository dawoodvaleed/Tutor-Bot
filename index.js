import { Configuration, OpenAIApi } from "openai";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const configuration = new Configuration({
  organization: "org-vOiHP65ZLel9hkuHoDLRe7IO",
  apiKey: "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",
});

const openai = new OpenAIApi(configuration);

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

app.post("/", async (req, res) => {
  const storeMessages = req.body.messages;
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "you are a Tutot bot which gives answers to topics related maths, physics and chemistry",
      },
      ...storeMessages,
    ],
  });
  res.json({
    completion: completion.data.choices[0].message,
  });
});

app.listen(port, () => {
  console.log(`App is listening at http://localhost:${port}`);
});
