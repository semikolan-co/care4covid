# Care4Covid
Care4Covid is a Realtime Statistical Website for Analysis of Covid-19 (Sars-Cov-2). It is an attempt to help people stay updated with the Covid-19 Analytics. In this Website you will have
- Track Realtime Covid-19 Cases
- Realtime Bed Availability in Hospitals of Madhya Pradesh 
- Information of Madhya Pradesh's Hospitals
- Vaccination Analytics with Daily Updates (Added Soon)
- Track on Cases of All Districts
- State Helplines by MoHFW

# How to SetUp Local Enviroment
At begin you need to Fork this repository, after that you need to clone this repository to your Local System. You can simply use git clone command to clone repository
``` 
git clone https://github.com/<your_username>/care4covid.git
```
After Cloning Repo in your Local System, you need Python to be Installed in your System. If you don't have Python in your System, you can Download it through their [Official Download Page](https://www.python.org/downloads/)
Now you have to move to the root directory  and you to Install all the modules required. You can simply download them using a simple command
```
pip install -r requirements.txt
```
With this Command all the required modules will be Installed in your system, Now you can run your Flask Server
To Start Flask Server you just need to run this command
```
python3 main.py
```
Now you will see that Development Server has been Started and your App is running on localhost:5000 or 127.0.0.1:5000

# Sources Used
-  **Bootstrapdash Template**: We have used a Bootstrapdash Template, more know about this Template through [here](https://github.com/BootstrapDash/PurpleAdmin-Free-Admin-Template)
-  **Covid19India APIs**: We have used Covid19India's APIs for Realtime tracking of Covid19 cases throughout the Country. You can have a look at these APIs through this [link](https://api.covid19india.org/)
-  **MP Covid Portal**: We have used [MP Covid Portal](http://sarthak.nhmmp.gov.in/covid/facility-bed-occupancy-details) for tracking the Beds Availability in Madhya Pradesh through Web Scrapping 