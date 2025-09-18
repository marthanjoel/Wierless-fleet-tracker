# Project Title: Wireless Fleet Tracker

## Objective
The Wireless Fleet Tracker monitors and logs vehicle behavior for fleet management.  
> Example: Tracks vehicle location, speed, mileage, fuel usage, and uptime to help managers optimize fleet operations and ensure safety compliance.

---

## Tools & Technologies
- **Programming Language:** Python 3.x
- **Frameworks / GUI:** Tkinter (Dashboard)
- **Simulator / Interface:** Custom Tkinter GUI for vehicle tracking
- **Dependencies:** None external; Python standard libraries (Tkinter, ttk)

---

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/marthanjoel/Wierless-fleet-tracker.git
cd wireless-fleet-tracker
2. (Optional) Create Virtual Environment
bash
Copy code
python3 -m venv venv
source venv/bin/activate
3. Install Dependencies
bash
Copy code
pip install -r requirements.txt
If no requirements.txt exists, Tkinter is included in standard Python 3 installations.

4. Run the Project
bash
Copy code
python3 fleet_tracker_tk.py
Simulation Details
Sensor Emulated: GPS location, OBD-II vehicle stats (speed, mileage, fuel)

Actuator Emulated: Dashboard table displaying vehicle data

Trigger Logic: Vehicles’ stats updated manually via GUI buttons (Add/Remove Vehicle)


--
##Screenshots
Include 2–3 screenshots showing:

file:///home/user/Pictures/Screenshots/Screenshot%20from%202025-09-18%2013-43-19.png

file:///home/user/Pictures/Screenshots/Screenshot%20from%202025-09-18%2013-44-47.png


---
##Observations
What worked well?

Real-time display of vehicle stats in a clean dashboard

Easy to add/remove simulated vehicles

Any bugs or challenges?

Tkinter GUI layout may need resizing for more vehicles

Real-time GPS simulation not yet integrated

How was the simulation validated?

Sample data inserted manually in the dashboard for testing


___
##Future Improvements
Integrate real-time GPS tracking from hardware devices

Connect to cloud backend for logging and analytics

Add alerts for speed, fuel, or vehicle downtime

Optionally, build a web interface using Flask or Angular

pgsql
Copy code
