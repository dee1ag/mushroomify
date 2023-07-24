import csv
import json

csv_file = '../data/MO106/metadata.csv'
json_file = '../data/MO106/metadata.json'

data = []

with open(csv_file, 'r') as file:
    reader = csv.DictReader(file)
    for row in reader:
        data.append(row)

with open(json_file, 'w') as file:
    json.dump(data, file, indent=4)
