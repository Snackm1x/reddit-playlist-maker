# reddit-playlist-maker

Sorry if this is the wrong place to post this but I'm not sure where it would fit better.

[TLDR - Here is a playlist of some reddit current favorites!](https://open.spotify.com/playlist/5bwVxM3el8UV8alzevVLSN)

Every once in awhile the posts pop up on reddit about what is everyone's favorite song currently. I've always wanted a way to take all of these songs and shove them into a Spotify playlist so that I have some new music to check out.

So I went ahead and created a program to do just that! I used [the post from about a week ago](https://www.reddit.com/r/AskReddit/comments/9fqzgi/whats_the_song_you_are_in_love_with_right_now/) and used some fancy programming magic to parse through the comments and find me titles + artists. I then sent these to the Spotify API so I could find the song and added them to a playlist.

I ended up using a RegEx expression to try to match for a title + artist combo that I could try to sort into some type of format so I could search for it on Spotify.

Currently the program is able to find things in the following formats:
    Title - Artist
    Title by Artist
    [Title -/by Artist but inside of a reddit markdown link]
    Also it can find any "Title -/by Artist" as long as it's in quotes inside of the comment

I tried to create an MVP so this program can definitely be approved upon still. I don't really want to spend a lot of time trying to find clever ways to decipher comments. If you would like your song on any of these posts to be included in future playlists follow one of the formats above please :)

I retreived the comments from the thread using the link and adding ".json" to the end of it. I then parsed this file. If anyone knows of a better way to get comments, since I'm not entirely sure it even gets them all, I would be open to suggestions.

For future posts though I should be able to create a new play list in a couple of minutes barring any errors, granted we will want to wait until the thread has run its course. If this is not the appropriate sub to share them on then I do apologize, otherwise when I see a new thread I can make a playlist and share it here.

Hope you enjoy!