from sklearn.preprocessing import StandardScaler

from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse, JsonResponse
import pickle
import numpy as np
import json
from rest_framework.decorators import api_view

with open('cs109_final_backend/network_files/pickled_network.pickle', 'rb') as f:
	NETWORK = pickle.load(f)

# with open('cs109_final_backend/network_files/songs_to_uri.pickle', 'rb') as f:
# 	SONGS_TO_URI = pickle.load(f)

with open('cs109_final_backend/network_files/uri_to_song.pickle', 'rb') as f:
	URI_TO_SONG = pickle.load(f)

with open('cs109_final_backend/network_files/track_to_artist_album.pickle', 'rb') as f:
	TRACK_TO_ARTIST_ALBUM = pickle.load(f)

with open('cs109_final_backend/cluster_files/uris_10.pickle', 'rb') as f:
    URIS_SET = pickle.load(f)

with open('cs109_final_backend/cluster_files/audio_features.pickle', 'rb') as f:
    AUDIO_FEATURES = pickle.load(f)

with open('cs109_final_backend/cluster_files/song_to_cluster.pickle', 'rb') as f:
    SONG_TO_CLUSTER = pickle.load(f)

with open('cs109_final_backend/cluster_files/cluster_to_songs.pickle', 'rb') as f:
    CLUSTER_TO_SONGS = pickle.load(f)

def make_audio_dict(audio_features):
	audio_df = pd.DataFrame(audio_features)
	audio_scaled = StandardScaler().fit_transform(audio_df)

	audio_dict = {}
	for i in range(len(uris)):
	    audio_dict[uris[i]] = audio_scaled[i]

	return audio_dict

AUDIO_DICT = make_audio_dict(AUDIO_FEATURES)

def sample_from_list(playlist_songs, network, u_to_s, num_samples=4000, as_names=True):
    # if not uri :
    #     playlist_songs = [s_to_u[s] for s in playlist_songs]
    # print(playlist_songs)
    all_samples = np.array([])
    for song_uri in playlist_songs:
        sample = np.random.choice(network[song_uri]['songs'], num_samples, p=network[song_uri]['counts'])
        all_samples = np.append(all_samples, sample)

    unique, counts = np.unique(all_samples, return_counts=True)

    counts = 100 * counts.astype(float) / np.sum(counts)
    # print (counts)
    counted_samples = zip(unique, counts)
    counted_samples = [sample for sample in counted_samples if sample[0] not in playlist_songs]
    counted_samples = sorted(counted_samples, key=lambda x: x[1], reverse=True)

    num_to_return = min(15, len(counted_samples))

    return counted_samples[:num_to_return]


def convert_to_viz_data(suggestions):
	vis_data = [{'x': URI_TO_SONG[s[0]][:20], 'y': round(float(s[1]), 3)} for s in suggestions]

	suggestion_data = [{'song_name': URI_TO_SONG[s[0]],
						'artist_name' : TRACK_TO_ARTIST_ALBUM[s[0]]['artist'],
						'album_name': TRACK_TO_ARTIST_ALBUM[s[0]]['album'],
						'score' : round(float(s[1]),3),
						'uri' : s[0]
						} for s in suggestions ]

	num_suggestions = min(5, len(suggestion_data))
	suggestion_data = suggestion_data[:num_suggestions]

	to_return = {'vis_data' : vis_data, 'suggestion_data' : suggestion_data}
	return to_return


@api_view(['POST'])
def network_most_likely(request):

	# data for the visualization
	#vis_songs = sample_from_list(request.data['songs'], NETWORK, URI_TO_SONG, SONGS_TO_URI, uri=False)

	songs_with_weights = sample_from_list(request.data['songs'], NETWORK, URI_TO_SONG)

	vis_data = [{'x': URI_TO_SONG[s[0]][:20], 'y': round(float(s[1]), 3)} for s in songs_with_weights]

	suggestion_data = [{'song_name': URI_TO_SONG[s[0]],
						'artist_name' : TRACK_TO_ARTIST_ALBUM[s[0]]['artist'],
						'album_name': TRACK_TO_ARTIST_ALBUM[s[0]]['album'],
						'score' : round(float(s[1]),3),
						'uri' : s[0]
						} for s in songs_with_weights ]

	num_suggestions = min(5, len(suggestion_data))
	suggestion_data = suggestion_data[:num_suggestions]

	to_return = {'vis_data' : vis_data, 'suggestion_data' : suggestion_data}

	return JsonResponse(to_return, safe=False)


@api_view(['POST'])
def cluster_most_likely(request):

	def predict_knn(playlist, song_to_cluster, cluster_to_songs, audio_dict):
        clusters = [song_to_cluster[song] for song in playlist if song in song_to_cluster]
        unique, counts = np.unique(clusters, return_counts=True)
        max_cluster_id = unique[np.argmax(counts)]
        max_cluster = cluster_to_song[max_cluster_id]

        avg_feat = get_average_features(playlist)
        distances = [(uri, distance(avg_feat, audio_dict[uri])) for uri in max_cluster]
        distances.sort(key=lambda tup: tup[1])

		num_to_return = min(15, len(distances))
	    return distances[:num_to_return]

    def get_average_features(playlist):
        average_features = None
        for uri in playlist:
            features = audio_dict[uri]
            if average_features is None:
                average_features = features
            else:
                average_features = average_features + features
        average_features = average_features / len(playlist)
        return average_features

    def distance(audio1, audio2):
        distance = np.sqrt(np.sum((audio1 - audio2) ** 2.0))
        return distance

	songs_with_dists = predict_knn(request.data['songs'], SONG_TO_CLUSTER,
									CLUSTER_TO_SONGS, AUDIO_DICT)

	to_return = convert_to_viz_data(songs_with_dists)

	return JsonResponse(to_return, safe=False)


# @api_view(['POST'])
# def song_name_to_info(request):
# 	song_name = request.data['song']
# 	if song_name in SONGS_TO_URI :
# 		song_uri = SONGS_TO_URI[song_name]
# 		album_name = TRACK_TO_ARTIST_ALBUM[song_uri]['album']
# 		artist_name = TRACK_TO_ARTIST_ALBUM[song_uri]['artist']
# 		return JsonResponse({'success' : True, 'data' : {'song_name' : song_name, 'album_name': album_name, 'artist_name': artist_name}})

# 	else :
# 		return JsonResponse({'success': False})
