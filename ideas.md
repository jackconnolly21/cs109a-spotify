## Ideas for Models to Make

Source: https://medium.com/recombee-blog/machine-learning-for-recommender-systems-part-1-algorithms-evaluation-and-cold-start-6f696683d0ed
* User-based KNN
	Find closest, most similar people (or playlist?) and suggest songs from there
	Cosine similarity?
	Would be too computationally intensive with entire dataset
* Association Rules
	Build a graph of things that are "frequently consumed together"
* Just go straight for Deep NN
	Train an autoencoder - might require a lot of effort?

Meeting:
* Build a network graph that connect a song to any other song it shares a playlist with
	Would be good for building from one current song
	If we have a song right after, weight it slightly heavier
* For groups of playlists:
* With spotify API or Last.fm, add in more features
* Autoencoders?

To Do:
* Nick: graph to use as markov chain (+ UI maybe?)
* Chris: User/Playlist Based KNN + data wrangling
* Andrew: Data wrangling and get some more features from Spotify API
* Jack: Variational Autoencoders, figure out feasibility/necessary data, maybe help with UI for Nick
