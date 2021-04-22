
from os import environ
from flask import Flask, redirect, render_template, request, url_for
import requests
import json
# print(data['summary'])

app = Flask(__name__)
app.debug = True


# Website
@app.route('/')
def index():
    r = requests.get('https://api.rootnet.in/covid19-in/stats/latest')
    data = r.json()['data']
    return render_template('index.html', data=data['summary'], regional = data['regional'])


@app.route('/helpline')
def helpline():
    with open('helpline.json') as f:
        data = json.load(f)['data']
    return render_template('helpline.html', data=data)


if __name__ == '__main__':
    app.run()
