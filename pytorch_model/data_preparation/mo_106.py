import os
import csv
import random

input_path = "../data/MO106/clean_dataset/MO_106"
output_path = "../data/MO106/transformed_dataset"
metadata_path = "../data/MO106/metadata.csv"

mushroom_species = [d for d in os.listdir(
    input_path) if os.path.isdir(os.path.join(input_path, d))]

os.makedirs(os.path.join(output_path, "train"), exist_ok=True)
os.makedirs(os.path.join(output_path, "test"), exist_ok=True)

with open(metadata_path, mode="w", newline="") as f:
    writer = csv.writer(f)
    writer.writerow(["mushroom_species_name"])
    for species in mushroom_species:
        writer.writerow([species])
        species_path = os.path.join(input_path, species)
        if os.path.isdir(species_path):
            os.makedirs(os.path.join(
                output_path, "train", species), exist_ok=True)
            os.makedirs(os.path.join(
                output_path, "test", species), exist_ok=True)

            image_files = [f for f in os.listdir(
                species_path) if f.endswith(".jpg")]

            random.shuffle(image_files)

            num_train = int(len(image_files) * 0.8)
            train_files = image_files[:num_train]
            test_files = image_files[num_train:]

            for train_file in train_files:
                input_file = os.path.join(species_path, train_file)
                output_file = os.path.join(
                    output_path, "train", species, train_file)
                os.rename(input_file, output_file)

            for test_file in test_files:
                input_file = os.path.join(species_path, test_file)
                output_file = os.path.join(
                    output_path, "test", species, test_file)
                os.rename(input_file, output_file)
