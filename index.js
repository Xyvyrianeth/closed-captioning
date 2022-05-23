import fs from "fs";
import { Deepgram } from "@deepgram/sdk";
import NodeMic from "node-mic";
import config from "./config.json" assert { type: "json" };

fs.writeFile("subtitles.txt", "", () => {});

const options = {
	punctuate: true,
	numerals: true,
	interim_results: config.TRANSCRIBE_QUICKLY,
	profanity_filter: config.PROFANITY_FILTER };
const deepgram = new Deepgram(config.DG_KEY);
const dgSocket = deepgram.transcription.live(options);
const sentenceCount = config.SENTENCE_COUNT;

const mic = new NodeMic({ rate: 16000, channels: 1 });
const micInputStream = mic.getAudioStream();
const outputFileStream = fs.createWriteStream('output.raw');
micInputStream.pipe(outputFileStream);
mic.start();

if (!config.TRANSCRIBE_QUICKLY && config.ONE_LINE)
{
	var text = '';
	var timeout = 0;
	const WPM = config.WPM;

	if (!config.TRANSCRIBE_QUICKLY) setInterval(() => {
		fs.writeFile("subtitles.txt", text, () => {});

		if (text == '')
		{
			timeout = 5000 / (200 / (WPM / 60));
		}
		else
		{
			timeout--;
			if (timeout < 0) text = text.substring(1);
		}
	}, 200 / (WPM / 60));
}
else
{
	var sentences = [];
	const sentenceCount = config.SENTENCE_COUNT;
}

dgSocket.addListener("open", () => {
	micInputStream.on('data', data => {
		if (dgSocket.getReadyState() == 1)
		{
			dgSocket.send(data);
		}
	});

	dgSocket.addListener("transcriptReceived", transcription => {
		const received = JSON.parse(transcription);
		const transcript = received.channel.alternatives[0].transcript;

		if (config.TRANSCRIBE_QUICKLY)
		{
			fs.writeFile("subtitles.txt", transcript, () => {});
		}
		else
		if (config.ONE_LINE)
		{
			if (transcript != '') text += transcript + ' ';
		}
		else
		{
			if (config.SILENCE_CLEARS || transcript != '') sentences.push(transcript);
			if (sentences.length > sentenceCount) sentences.shift();
			fs.writeFile("subtitles.txt", sentences.join("\n"), () => {});
		}
		if (transcript != '')
		{
			console.log(transcript);
		}
	});

	console.log("Beginning transcription");
});