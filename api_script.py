
# Source code modeled after: https://www.kaggle.com/geomack/how-to-grab-data-using-the-spotipy-library

import pprint 
pp = pprint.PrettyPrinter(indent=4)

import pandas as pd 
import spotipy 
sp = spotipy.Spotify() 
from spotipy.oauth2 import SpotifyClientCredentials 
cid ="1b81d49177e5464781a4957e5e0c1ae6" 
secret = "c444a35689e247f8b5f9830662bae244" 
client_credentials_manager = SpotifyClientCredentials(client_id=cid, client_secret=secret) 
sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager) 
sp.trace=False 
sp.audio_features(['343YBumqHu19cGoGARUTsd'])
