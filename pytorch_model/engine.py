import torch
from tqdm.auto import tqdm
from typing import Dict, List, Tuple
from utils import save_model


def train_step(model: torch.nn.Module,
               dataloader: torch.utils.data.DataLoader,
               loss_fn: torch.nn.Module,
               optimizer: torch.optim.Optimizer,
               device: torch.device) -> Tuple[float, float]:
    model.train()

    train_loss, train_accuracy = 0, 0

    for _, (X, y) in enumerate(dataloader):
        X, y = X.to(device), y.to(device)

        y_pred = model(X)

        loss = loss_fn(y_pred, y)
        train_loss += loss.item()

        optimizer.zero_grad()

        loss.backward()

        optimizer.step()

        y_pred_class = torch.argmax(torch.softmax(y_pred, dim=1), dim=1)
        train_accuracy += (y_pred_class == y).sum().item()/len(y_pred)

    train_loss = train_loss / len(dataloader)
    train_accuracy = train_accuracy / len(dataloader)
    return train_loss, train_accuracy


def test_step(model: torch.nn.Module,
              dataloader: torch.utils.data.DataLoader,
              loss_fn: torch.nn.Module,
              device: torch.device) -> Tuple[float, float]:
    model.eval()

    test_loss, test_accuracy = 0, 0

    with torch.inference_mode():
        for _, (X, y) in enumerate(dataloader):
            X, y = X.to(device), y.to(device)

            test_pred_logits = model(X)

            loss = loss_fn(test_pred_logits, y)
            test_loss += loss.item()

            test_pred_labels = test_pred_logits.argmax(dim=1)
            test_accuracy += ((test_pred_labels == y).sum().item() /
                              len(test_pred_labels))

    test_loss = test_loss / len(dataloader)
    test_accuracy = test_accuracy / len(dataloader)
    return test_loss, test_accuracy


def train(model: torch.nn.Module,
          train_dataloader: torch.utils.data.DataLoader,
          test_dataloader: torch.utils.data.DataLoader,
          optimizer: torch.optim.Optimizer,
          loss_fn: torch.nn.Module,
          epochs: int,
          device: torch.device) -> Dict[str, List]:

    results = {"train_loss": [],
               "train_accuracy": [],
               "test_loss": [],
               "test_accuracy": []
               }

    model.to(device)

    for epoch in tqdm(range(epochs)):
        train_loss, train_accuracy = train_step(model=model,
                                                dataloader=train_dataloader,
                                                loss_fn=loss_fn,
                                                optimizer=optimizer,
                                                device=device)
        test_loss, test_accuracy = test_step(model=model,
                                             dataloader=test_dataloader,
                                             loss_fn=loss_fn,
                                             device=device)

        save_model(model, 'models', 'efficientnet_v2_s_384_none.pth')

        print(
            f"Epoch: {epoch+1} | "
            f"train_loss: {train_loss:.4f} | "
            f"train_accuracy: {train_accuracy:.4f} | "
            f"test_loss: {test_loss:.4f} | "
            f"test_accuracy: {test_accuracy:.4f} | "
        )

        results["train_loss"].append(train_loss)
        results["train_accuracy"].append(train_accuracy)
        results["test_loss"].append(test_loss)
        results["test_accuracy"].append(test_accuracy)

    return results
