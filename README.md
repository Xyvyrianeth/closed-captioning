## Setup
1. Create a new folder and save all of this shit into it. It can be literally anywhere. Copy the file path for later.
2. Open Setup.lnk once. This will install all of the necessary node modules into the folder. Once it's done, move to step 3.
3. In OBS, create a Text (GDI+) source. In the source properties, check the box "Read from file" and link it to subtitles.txt in the folder (good thing you copied the path in step 1, eh?).
4. Stylize the Text source as you see fit. Personally, I prefer the font Calibri; and white text with a black outline is readable over anything. Make sure the text is large enough and that it doesn't run off the edge of the source object (enable wrap).
5. Open Subtitles.lnk to run the program. When you speak, the program will constantly update the contents of subtitles.txt, and OBS will constantly be reading its contents and updating the source to match.
---
## Configure
`DG_KEY` - Necessary to use Deepgram. Creating an account is free and gives a shitton of free usage hours.

`TRANSCRIBE_QUICKLY` - By default, Deepgram tries its best to transcribe full sentences. It checks for gaps in your speech and breaks it into chunks to be transcribed at once. This results in full sentences being transcribed *after* it's been spoken, which can be a considerable delay. This can be bypassed so that words are transcribed individually, which can reduce accuracy of transcription because the context of adjacent words will be ignored.

`ONE_LINE` - As you talk and more gets transcribed, all that text needs to get displayed, and eventually you've got more text than you can show, so the program has to erase some of the new text. When enabled, new text will simply attach to the end of the old text, and letters will steadily vanish from the beginning to make room for the newer text. When disabled, new text will display below the old text, and when there are too many lines of text to display, older lines will disappear. Ignored if `TRANSCRIBE_QUICKLY` is enabled.

`WPM` - Determined how fast letters are deleted to make room for more transcription. Higher numbers result in faster deletion. Ignored if `TRANSCRIBE_QUICKLY` is enabled or if `ONE_LINE` is disabled.

`SENTENCE_COUNT` - Used to determine how many lines of text can be displayed at once. Ignored if `TRANSCRIBE_QUICKLY` OR `ONE_LINE` is enabled.

`SILENCE_CLEARS` - When enabled, extended bouts of silence will eventually clear out the displayed text. When disabled, sentences will remain displayed until you continue speaking enough for them to get written out. Ignored if `TRANSCRIBE_QUICKLY` is enabled.

`PROFANITY_FILTER` - Profanity filter.