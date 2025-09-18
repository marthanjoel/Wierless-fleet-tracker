import tkinter as tk
from tkinter import ttk

# Main window
root = tk.Tk()
root.title("Fleet Tracker Dashboard")
root.geometry("600x400")

# Title
title = tk.Label(root, text="Wireless Fleet Tracker", font=("Arial", 18, "bold"))
title.pack(pady=10)

# Treeview (table) for vehicle data
columns = ("Vehicle ID", "Miles Driven", "Uptime (hrs)", "Location", "Speed (km/h)", "Fuel (L)")
tree = ttk.Treeview(root, columns=columns, show="headings", height=8)

for col in columns:
    tree.heading(col, text=col)
    tree.column(col, width=100)

tree.pack(pady=10)

# Sample data
sample_data = [
    ("VH001", "1200", "30", "Lat:0.34,Lng:32.58", "65", "45"),
    ("VH002", "800", "15", "Lat:0.29,Lng:32.60", "55", "60"),
]

for row in sample_data:
    tree.insert("", tk.END, values=row)

# Buttons frame
frame = tk.Frame(root)
frame.pack(pady=10)

def add_vehicle():
    tree.insert("", tk.END, values=("VH003", "0", "0", "Unknown", "0", "0"))

def remove_vehicle():
    selected = tree.selection()
    for item in selected:
        tree.delete(item)

btn_add = tk.Button(frame, text="Add Vehicle", command=add_vehicle)
btn_add.grid(row=0, column=0, padx=5)

btn_remove = tk.Button(frame, text="Remove Vehicle", command=remove_vehicle)
btn_remove.grid(row=0, column=1, padx=5)

btn_exit = tk.Button(frame, text="Exit", command=root.quit)
btn_exit.grid(row=0, column=2, padx=5)

# Run app
root.mainloop()
