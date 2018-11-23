import json
import numpy as np
import pickle


# 
song_name_to_uri = {}
uri_to_song_name = {}
network = {}

f_start = 0
f_end = 999

# open the first n files, and read them into the network 
for i in range(20) : 
    with open('./mpd.v1/data/mpd.slice.{}-{}.json'.format(f_start, f_end)) as f : 
        data = json.load(f)
        
    for playlist in data['playlists'] : 

        for song in playlist['tracks'] : 
            track_name  = song['track_name']
            track_uri = song['track_uri']
            shared_songs = np.array([s['track_uri'] for s in playlist['tracks'] if s['track_uri'] != track_uri])

            
            
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
    

# clean the network (switch to counts rather then multiple edges) 
print("Cleaning up the Network a bit")
for uri in network : 
    unique, counts = np.unique(network[uri], return_counts=True)
    network[uri] = {'songs' : unique, 'counts': counts / np.sum(counts)}


# Save the network 
with open('basic_network_20.pickle', 'wb') as f:
    pickle.dump(network, f)

with open('songs_to_uri.pickle', 'wb') as f:
    pickle.dump(song_name_to_uri, f)

with open('uri_to_song', 'wb') as f:
    pickle.dump(uri_to_song_name, f)


