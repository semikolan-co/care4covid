
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

# Website
@app.route('/state/<state>')
def state(state):
    r = requests.get('https://api.covid19india.org/state_district_wise.json')
    try:
        data = r.json()[state]
    except:
        return f"404 | State: {state} not found"
    else:
        return render_template('state.html', data=data['districtData'],state=state)
        # return "Data Getched Successfully"


@app.route('/helpline')
def helpline():
    with open('helpline.json') as f:
        data = json.load(f)['data']
    return render_template('helpline.html', data=data)

@app.route('/hospital/<state>')
def hospital(state):
    try:
        with open(f'{state}.json') as f:
            data = json.load(f)
    except:
        return f"404 | State: {state} not found"
    
    return render_template('hospital.html', data=data)

@app.route('/beds/<state>')
def beds(state):
    r = requests.get(f'https://webscrapercovid.lordblackwood.repl.co/{state}')
    try:
        data = r.json()['data']
    except:
        return f"404 | State: {state} not found"
    else:
        return render_template('beds.html', data=data)


if __name__ == '__main__':
    app.run()
