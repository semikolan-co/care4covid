
from os import environ
from flask import Flask, redirect, render_template, request, url_for
import requests
import json
import datetime

# print(data['summary'])

app = Flask(__name__)
app.debug = True

@app.errorhandler(404)
def not_found(e):
  return render_template("404.html")
# Website
@app.route('/')
def index():
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

@app.route('/feedback')
def feedback():
    return render_template('feedback.html')

@app.route('/feedback', methods=['GET', 'POST'])
def addfeedback():
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

@app.route('/sources')
def sources():
    
    with open('sources.json') as f:
        data = json.load(f)
        sources = data["official"]
        initiatives =data["initiatives"]
    return render_template('sources.html',sources=sources,initiatives=initiatives)


if __name__ == '__main__':
    app.run()
