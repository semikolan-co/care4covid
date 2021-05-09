
from os import environ
from flask import Flask, redirect, render_template, request, url_for
import requests
import json
import datetime


def getUserData(route):
    if request.headers.getlist("X-Forwarded-For"):
        ip = request.headers.getlist("X-Forwarded-For")[0]
    else:
        ip = request.remote_addr
    with open("users.txt", "a") as f:
        f.write(f"Page Visited: {route}\n")
        f.write(f"User Agent: {request.headers.get('User-Agent')}\n")
        f.write(f"Remote Addr: {ip}\n")
        f.write(f"DateTime: {datetime.datetime.now()}\n")
        f.write(f"\n\n\n")


app = Flask(__name__)
app.debug = True

@app.errorhandler(404)
def not_found(e):
    getUserData("404 Page")
    return render_template("404.html")
# Website
@app.route('/')
def index():
    getUserData("Index Page")
    r = requests.get('https://api.rootnet.in/covid19-in/stats/latest')
    data = r.json()['data']
    a = requests.get('https://api.covid19india.org/data.json')
    today = a.json()['cases_time_series'][-1]
    yesterday = a.json()['cases_time_series'][-2]
    today['active'] = int(today['dailyconfirmed'])-(int(today['dailydeceased'])+ int(today['dailyrecovered']))
    yesterday['active'] = int(yesterday['dailyconfirmed'])-(int(yesterday['dailydeceased'])+ int(today['dailyrecovered']))
    def calcIncrement(key):
     return "{:.2f}".format(((int(today[key]) - int(yesterday[key]))/int(yesterday[key]))*100)

    increment = {}
    increment['total'] = calcIncrement('dailyconfirmed')
    increment['recovered'] = calcIncrement('dailyrecovered')
    increment['active'] = calcIncrement('active')   
    increment['deceased'] = calcIncrement('dailydeceased')
    
    # return today
    return render_template('index.html',today=today, data=data['summary'], increment=increment,regional = data['regional'])

# Website
@app.route('/state/<state>')
def state(state):
    getUserData(f"State - {state}")

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
    getUserData("Helpline")

    with open('helpline.json') as f:
        data = json.load(f)['data']
    return render_template('helpline.html', data=data)

@app.route('/feedback')
def feedback():
    getUserData("Feedback")

    return render_template('feedback.html')

@app.route('/feedback', methods=['GET', 'POST'])
def addfeedback():
    getUserData("Feedback POST")

    # handle the POST request
    if request.method == 'POST':
        name = request.form.get('name')
        email = request.form.get('email')
        howknow = request.form.get('howknow')
        howuseful = request.form.get('howuseful')
        number = request.form.get('number')
        feedback = request.form.get('feedback')
       #...... and so on.. till last input
        with open("feedback.txt", "a") as f:
           f.write(f"Name: {name}\n")
           f.write(f"Email: {email}\n")
           f.write(f"Number: {number}\n")
           f.write(f"How do you know website: {howknow}\n")
           f.write(f"How can we make website useful: {howuseful}\n")
           f.write(f"Feedback: {feedback}\n")
           f.write(f"DateTime: {datetime.datetime.now()}\n")

           f.write(f"\n\n\n")
           return redirect('/')


@app.route('/hospital/<state>')
def hospital(state):
    getUserData(f"Hospital - {state}")

    try:
        with open(f'{state}.json') as f:
            data = json.load(f)
    except:
        return f"404 | State: {state} not found"
    
    return render_template('hospital.html', data=data)
    
@app.route('/beds/<state>')
def beds(state):
    getUserData(f"Beds - {state}")

    r = requests.get(f'https://webscrapercovid.lordblackwood.repl.co/{state}')
    try:
        data = r.json()['data']
    except:
        return f"404 | State: {state} not found"
    else:
        return render_template('beds.html', data=data)

@app.route('/sources')
def sources():
    getUserData("Sources")

    
    with open('sources.json') as f:
        data = json.load(f)
        sources = data["official"]
        initiatives =data["initiatives"]
    return render_template('sources.html',sources=sources,initiatives=initiatives)


if __name__ == '__main__':
    app.run(host ='0.0.0.0', port = 5001, debug = True)
