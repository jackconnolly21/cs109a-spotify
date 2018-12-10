import json
import numpy as np
import sys
import pickle 


NUMBER_OF_FILES_TO_USE = 14

# After running into issues trying to pickle large objects (ie our graph), 
# It turns out that there's an issue in the pickle implementation. This stack overflow function 
# allows for easy saving of big objects 
# https://stackoverflow.com/questions/42653386/does-pickle-randomly-fail-with-oserror-on-large-files
def save_as_pickled_object(obj, filepath):
    """
    This is a defensive way to write pickle.write, allowing for very large files on all platforms
    """
    max_bytes = 2**31 - 1
    bytes_out = pickle.dumps(obj)
    n_bytes = sys.getsizeof(bytes_out)
    with open(filepath, 'wb') as f_out:
        for idx in range(0, n_bytes, max_bytes):
            f_out.write(bytes_out[idx:idx+max_bytes])


"""
The code below builds the 
"""
song_name_to_uri = {}
uri_to_song_name = {}
track_to_artist_album = {}
network = {}

f_start = 1000
f_end = 1999
for i in range(NUMBER_OF_FILES_TO_USE) : 
    with open('./mpd.v1/data/mpd.slice.{}-{}.json'.format(f_start, f_end)) as f : 
        data = json.load(f)
        
    for playlist in data['playlists'] : 

        for song in playlist['tracks'] : 
            track_name  = song['track_name']
            track_uri = song['track_uri']
            shared_songs = np.array([s['track_uri'] for s in playlist['tracks'] if s['track_uri'] != track_uri])

            if track_uri not in track_to_artist_album:
                track_to_artist_album[track_uri] = {'artist': song['artist_name'], 'album': song['album_name']}
                
            
            if track_name not in song_name_to_uri : 
                song_name_to_uri[track_name] = track_uri
            if track_uri not in uri_to_song_name : 
                uri_to_song_name[track_uri] = track_name


            if track_uri not in network : 
                network[track_uri] = np.array(shared_songs)
            else : 
                network[track_uri] = np.append(network[track_uri], np.array(shared_songs))
                
    print ("done loading file", i)             
    f_start += 1000
    f_end += 1000
    

# clean the network -> counts per song (normalized)
print("Cleaning up the Network a bit")
for uri in network : 
    unique, counts = np.unique(network[uri], return_counts=True)
    network[uri] = {'songs' : unique, 'counts': counts / np.sum(counts)}




# Save all of the objects 
save_as_pickled_object(network, 'pickled_network.pickle')

with open('songs_to_uri.pickle', 'wb') as f:
    pickle.dump(song_name_to_uri, f)

with open('uri_to_song.pickel', 'wb') as f:
    pickle.dump(uri_to_song_name, f)

with open('track_to_artist_album.pickel', 'wb') as f:
    pickle.dump(track_to_artist_album, f)
