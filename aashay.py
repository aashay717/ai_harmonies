import os
from email.mime.base import MIMEBase
from email.mime.text import MIMEText
from twilio.rest import Client
import sounddevice as sd
import numpy as np
import speech_recognition as sr
from gtts import gTTS
import soundfile as sf
import webbrowser
import datetime
import requests
import psutil
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
import subprocess
from pytube import YouTube
import smtplib
from email.mime.multipart import MIMEMultipart
from email import encoders

msg = MIMEMultipart()
account_sid = 'AC7a587dd4812067c75ae999915f183b06'
auth_token = '76a80492c4d285dfdc20274485a5d4d2'
client = Client(account_sid, auth_token)

def make_call(to, from_, message):
    call = client.calls.create(
        url='http://demo.twilio.com/docs/voice.xml',
        to=to,
        from_=from_,
        twiml='<Response><Say>'+message+'</Say></Response>'
    )
    print(call.sid)

def send_message(to, from_, body):
    message = client.messages.create(
        to=to,
        from_=from_,
        body=body
    )
    print(message.sid)



def listen():
    recognizer = sr.Recognizer()
    with sr.Microphone() as source:
        print("Listening...")
        audio = recognizer.listen(source)
    try:
        user_input = recognizer.recognize_google(audio)
        print("You said:", user_input)
        return user_input
    except sr.UnknownValueError:
        print("Sorry, I couldn't understand what you said.")
        return ""
def greet():
    print("Hi there! I'm your assistant.")
    speak("Hi there! I'm your assistant.")
def play_audio(filename):
    data, _ = sf.read(filename, dtype='float32')
    sd.play(data, samplerate=44100)
import time

def speak(text, speed=2.0, timeout=10):
    try:
        tts = gTTS(text=text, lang='en', slow=False, timeout=timeout)
        tts.speed = speed
        tts.save("output.mp3")
        play_audio("output.mp3")

        while sd.get_stream().active:
            time.sleep(0.1)
    except Exception as e:
        print("Error occurred during speech synthesis:", e)



def open_website(url):
    webbrowser.open(url)

def init_spotipy():
    client_id = 'fb32e0e0d1d74a20820b02134ea60a7f'
    client_secret = '1d9e4da9e3f94b3285b4b07dfac6cd70'
    client_credentials_manager = SpotifyClientCredentials(client_id=client_id, client_secret=client_secret)
    sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager)
    print("Spotipy client initialized successfully.")
    return sp
'''def search_tracks(query):
    sp = init_spotipy()  # Initialize Spotipy client
    results = sp.search(q=query, limit=1)
    if results['tracks']['items']:
        track_uri = results['tracks']['items'][0]['uri']
        return track_uri
    else:
        return None '''
def search_tracks(query):
    api_key = '62b6941778b25a941f5d410f74443653'
    base_url = 'http://ws.audioscrobbler.com/2.0/'
    params = {
        'method': 'track.search',
        'track': query,
        'api_key': api_key,
        'format': 'json'
    }
    response = requests.get(base_url, params=params)
    data = response.json()
    if 'results' in data and 'trackmatches' in data['results']:
        tracks = data['results']['trackmatches']['track']
        return tracks
    else:
        return []
def play_track(track_uri):
    try:
        subprocess.run(["spotify", "play", track_uri])
        print("Playing music...")
    except Exception as e:
        print("Error playing track:", e)

'''def play_music(song_name):
    sp = init_spotipy()  # Initialize Spotipy client
    if sp:
        print("Searching for tracks...")
        results = sp.search(q='track:' + song_name, type='track', limit=1)
        if results['tracks']['items']:
            track_uri = results['tracks']['items'][0]['uri']
            print("Found track:", track_uri)
            sp.start_playback(uris=[track_uri])
            print("Playing music...")
        else:
            print("No matching track found.")
    else:
        print("Error: Spotipy client not initialized.") '''

def play_music_track(track_url):

    webbrowser.open(track_url)
    youtube_url = f"https://www.youtube.com/results?search_query={track_url}"
    webbrowser.open(youtube_url)




def get_weather_forecast(api_key, city_name):
    base_url = "http://api.openweathermap.org/data/2.5/weather?"
    complete_url = f"{base_url}q={city_name}&appid={api_key}&units=metric"
    response = requests.get(complete_url)
    if response.status_code == 200:
        data = response.json()
        city = data['name']
        weather = data['weather'][0]['description']
        temperature = data['main']['temp']
        humidity = data['main']['humidity']
        wind_speed = data['wind']['speed']
        weather_info = f"Weather in {city}: {weather}\nTemperature: {temperature}°C\nHumidity: {humidity}%\nWind Speed: {wind_speed} m/s"
        return weather_info
    else:
        print(f"Error fetching weather data. Status code: {response.status_code}")


def get_weather():
    api_key = '7042f956dd37ee25e408f150abc244a9'
    city_name = 'delhi'
    weather_info = get_weather_forecast(api_key, city_name)
    print(weather_info)
    speak(weather_info)


def get_current_time():
    current_time = datetime.datetime.now().strftime("%I:%M %p")
    print("The current time is", current_time)
    speak("The current time is " + current_time)

def battery():
    battery = psutil.sensors_battery()
    battery_percentage = str(battery.percent)
    plugged = battery.power_plugged
    speak(f"Sir, it is {battery_percentage} percent.")
    if plugged:
        speak("and It is charging....")
    if not plugged:
        if battery_percentage <= "95%":
            speak("Sir, plug charger.")
def get_music_news(api_key):
    url = "https://newsapi.org/v2/everything"
    params = {
        "q": "music",
        "apiKey": '7d14fff9efac4fc896616c05d2c0efc0'
    }
    response = requests.get(url, params=params)
    if response.status_code == 200:
        data = response.json()
        articles = data.get("articles", [])
        if articles:
            for idx, article in enumerate(articles[:5], start=1):
                title = article.get("title", "")
                description = article.get("description", "")
                print(f"Article {idx}: {title}")
                print(description)
                print("-" * 50)
        else:
            print("No music news articles found.")
    else:
        print(f"Failed to fetch music news. Status code: {response.status_code}")

def send_mail(to,content):
    server=smtplib.SMTP('smtp.gmail',587)
    server.starttls()
    server.ehlo()
    server.login('YOUR EMAIL ADDRESS', 'YOUR PASSWORD')
    server.sendmail('YOUR EMAIL ADDRESS', to, content)
    server.close()

def main():
    sp = init_spotipy()
    greet()
    name = None
    while True:
        print("What can I do for you?")
        speak("What can I do for you?")
        user_input = listen().lower()

        if "bye" in user_input:
            print("Goodbye!")
            speak("Goodbye!")
            break
        elif "play music" in user_input:
            print("Sure! What song would you like to play?")
            speak("Sure! What song would you like to play?")
            song_name = listen().lower()
            tracks = search_tracks(song_name)
            if tracks:
                first_track = tracks[0]
                artist = first_track['artist']
                track_name = first_track['name']
                print(f"Found track: {track_name} by {artist}")
                track_url = first_track['url']
                print("Playing music track...")
                play_music_track(track_url)
                break
            else:
                print("No tracks found.")

        elif "email" in user_input:

            speak("sir what should i say")
            user_input = listen().lower()
            if "send a file" in user_input:
                email = 'your@gmail.com'  # Your email
                password = 'your_pass'  # Your email account password
                send_to_email = 'To_person@gmail.com'  # Whom you are sending the message to
                speak("okay sir, what is the subject for this email")
                user_input = listen().lower()
                subject = user_input  # The Subject in the email
                speak("and sir, what is the message for this email")
                user_input2 = listen().lower()
                message = user_input2  # The message in the email
                speak("sir please enter the correct path of the file into the shell")
                file_location = input("please enter the path here")  # The File attachment in the email

                speak("please wait,i am sending email now")

                msg = MIMEMultipart()
                msg['From'] = email
                msg['To'] = send_to_email
                msg['Subject'] = subject

                msg.attach(MIMEText(message, 'plain'))


                filename = os.path.basename(file_location)
                attachment = open(file_location, "rb")
                part = MIMEBase('application', 'octet-stream')
                part.set_payload(attachment.read())
                encoders.encode_base64(part)
                part.add_header('Content-Disposition', "attachment; filename= %s" % filename)
                msg.attach(part)
                server = smtplib.SMTP('smtp.gmail.com', 587)
                server.starttls()
                server.login(email, password)
                text = msg.as_string()
                server.sendmail(email, send_to_email, text)
                server.quit()
                speak("email has been sent to aashay")
            else:
                email = '12212213@nitkkr.ac.in'  # Your email
                password = '9304638092'
                speak("whom to sen email")# Your email account password
                send_to_email = 'aashay717@gmail.com' # Whom you are sending the message to
                message = user_input  # The message in the email

                server = smtplib.SMTP('smtp.gmail.com', 587)  # Connect to the server
                server.starttls()  # Use TLS
                server.login(email, password)  # Login to the email server
                server.sendmail(email, send_to_email, message)  # Send the email
                server.quit()
        elif "make a call" in user_input:
            print("Sure! Who do you want to call")
            speak("Sure! Who do you want to call")
            recipient_number = listen().lower()
            print("What message would you like to convey")
            speak("What message would you like to convey")
            message = listen().lower()
            make_call(+919034045213,+16319387358, message)
        elif "send a message" in user_input:
            print("sure! Who do you want to message")
            speak("sure! Who do you want to message")
            recipient_number = listen().lower()
            print("What message would you like to convey")
            speak("What message would you like to convey")
            message = listen().lower()
            send_message(+919034045213, +16319387358, message)


        elif "weather forecast" in user_input:
            get_weather()
        elif "current time" in user_input:
            get_current_time()
        elif "my name" in user_input:
            if name:
                print(f"Your name is {name}.")
                speak(f"Your name is {name}.")
            else:
                print("I don't know your name. What's your name?")
                speak("I don't know your name. What's your name?")
                name_input = listen()
                name = name_input.capitalize()
                speak("Nice to meet you, " + name)
                print("Nice to meet you, ", name)
        elif "news" in user_input:
            get_music_news("YOUR_NEWS_API_KEY")
        else:
            print("I'm sorry, I didn't catch that. Can you repeat?")
            speak("I'm sorry, I didn't catch that. Can you repeat?")

if __name__ == "__main__":
    main()
