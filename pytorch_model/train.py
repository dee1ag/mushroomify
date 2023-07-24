from torchvision.transforms import Compose, Resize, TrivialAugmentWide, ToTensor, Normalize
import torch
import torchvision
import torchinfo
import data_setup
import engine
import utils
from timeit import default_timer as timer

NUM_EPOCHS = 10
BATCH_SIZE = 32
LEARNING_RATE = 0.0001

torch.manual_seed(42)
torch.cuda.manual_seed(42)

train_path = "data/MO106/transformed_dataset/train"
test_path = "data/MO106/transformed_dataset/test"

device = "cuda" if torch.cuda.is_available() else "cpu"

if __name__ == "__main__":

    train_transform = Compose([
        Resize((384, 384)),
        TrivialAugmentWide(),
        ToTensor(),
        Normalize(mean=[0.485, 0.456, 0.406],
                  std=[0.229, 0.224, 0.225])
    ])

    test_transform = Compose([
        Resize((384, 384)),
        ToTensor(),
        Normalize(mean=[0.485, 0.456, 0.406],
                  std=[0.229, 0.224, 0.225])
    ])

    train_dataloader, test_dataloader, class_names = data_setup.create_dataloaders(
        train_path=train_path,
        test_path=test_path,
        train_transform=train_transform,
        test_transform=test_transform,
        batch_size=BATCH_SIZE
    )

    weights = torchvision.models.EfficientNet_V2_S_Weights.DEFAULT
    model = torchvision.models.efficientnet_v2_s(
        weights=weights).to(device)

    output_shape = len(class_names)

    model.classifier = torch.nn.Sequential(
        torch.nn.Dropout(p=0.5, inplace=True),
        torch.nn.Linear(in_features=1280,
                        out_features=output_shape,
                        bias=True)).to(device)

    loss_fn = torch.nn.CrossEntropyLoss()
    optimizer = torch.optim.Adam(model.parameters(),
                                 lr=LEARNING_RATE)

    start_time = timer()

    # print(torchinfo.summary(model=model,
    #                         input_size=(128, 3, 384, 384),
    #                         verbose=0,
    #                         col_names=["input_size", "output_size",
    #                                    "num_params", "trainable"],
    #                         col_width=20,
    #                         row_settings=["var_names"]
    #                         ))

    model.load_state_dict(torch.load('models/efficientnet_v2_s_384.pth'))

    # engine.train(model=model,
    #              train_dataloader=train_dataloader,
    #              test_dataloader=test_dataloader,
    #              loss_fn=loss_fn,
    #              optimizer=optimizer,
    #              epochs=NUM_EPOCHS,
    #              device=device)

    end_time = timer()

    # utils.save_model(model=model,
    #                  target_path="models",
    #                  model_name="efficientnet_v2_s.pth")

    utils.save_model_mobile(model=model,
                            target_path="models",
                            model_name="efficientnet_v2_s_384.ptl")

    print(f"Total training time: {end_time-start_time:.3f} seconds")
