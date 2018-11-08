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