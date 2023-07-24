import os
import shutil
from PIL import Image

source_folder = "../data/MO106/transformed_dataset/test"
destination_folder = "../data/MO106/images"

for mushroom_species_folder in os.listdir(source_folder):
    if os.path.isdir(os.path.join(source_folder, mushroom_species_folder)):
        images = os.listdir(os.path.join(
            source_folder, mushroom_species_folder))
        if images:
            first_image = images[2]

            species = os.path.splitext(
                first_image.split("_", 1)[0])[0]
            species_image = species.replace(" ", "_") + ".jpg"

            os.makedirs(destination_folder, exist_ok=True)

            source_image_path = os.path.join(
                source_folder, mushroom_species_folder, first_image)
            destination_image_path = os.path.join(
                destination_folder, species_image)

            image = Image.open(source_image_path)
            resized_image = image.resize((600, 600))

            resized_image.save(destination_image_path)
