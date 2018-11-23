from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse, JsonResponse
import pickle 
import numpy as np
import json

with open('cs109_final_backend/network_files/pickled_network.pickle', 'rb') as f: 
	NETWORK = pickle.load(f)

with open('cs109_final_backend/network_files/songs_to_uri.pickle', 'rb') as f: 
	SONGS_TO_URI = pickle.load(f)

with open('cs109_final_backend/network_files/uri_to_song.pickle', 'rb') as f: 
	URI_TO_SONG = pickle.load(f)

with open('cs109_final_backend/network_files/track_to_artist_album.pickle', 'rb') as f: 
	TRACK_TO_ARTIST_ALBUM = pickle.load(f)


def sample_from_list(playlist_songs, network, u_to_s, s_to_u, uri=True, num_samples=1000, as_names=True): 
    if not uri : 
        playlist_songs = [s_to_u[s] for s in playlist_songs]
        
    all_samples = np.array([])
    for song_uri in playlist_songs: 
        sample = np.random.choice(network[song_uri]['songs'], num_samples, p=network[song_uri]['counts'])
        all_samples = np.append(all_samples, sample)
    
    unique, counts = np.unique(all_samples, return_counts=True)
    counted_samples = zip(unique, counts)
    counted_samples = sorted(counted_samples, key=lambda x: x[1], reverse=True)
    
    num_to_return = min(15, len(counted_samples))
    
    # to_return = []
    if as_names : 
    	to_return = [{'x': u_to_s[s[0]], 'y': int(s[1])} for s in counted_samples[:num_to_return]]
    else : 
    	to_return = [{'x': s[0], 'y': int(s[1])} for s in counted_samples[:num_to_return]]

    return to_return


@csrf_exempt
def network_most_likely(request): 

	vis_songs = sample_from_list(['Party In The U.S.A.'], NETWORK, URI_TO_SONG, SONGS_TO_URI, uri=False)
	# song_album_artist = []
	# for song in vis_songs : 
 #  		song_album_artist.append({'song_name': song[0]
 #  								'artist_name': TRACK_TO_ARTIST_ALBUM[SONGS_TO_URI[s[0]]]['artist'], 
 #  								'album_name': TRACK_TO_ARTIST_ALBUM[SONGS_TO_URI[s[0]]]['album']
 #  								})

  	# to_return = {'vis_data': vis_songs, 'current': song_album_artist}

	return JsonResponse(vis_songs, safe=False)


