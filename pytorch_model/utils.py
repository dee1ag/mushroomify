import torch
from pathlib import Path
from torch.utils.mobile_optimizer import optimize_for_mobile


def save_model(model: torch.nn.Module,
               target_path: str,
               model_name: str):

    target_dir_path = Path(target_path)
    target_dir_path.mkdir(parents=True,
                          exist_ok=True)

    assert model_name.endswith(".pth") or model_name.endswith(
        ".pt"), "model_name should end with '.pt' or '.pth'"
    model_save_path = target_dir_path / model_name

    torch.save(obj=model.state_dict(), f=model_save_path)


def save_model_mobile(model: torch.nn.Module,
                      model_name: str):

    model.to('cpu')

    assert model_name.endswith(".ptl"), "model_name should end with '.ptl'"

    model.eval()

    scripted_model = torch.jit.script(model)
    optimized_model = optimize_for_mobile(scripted_model)
    optimized_model._save_for_lite_interpreter(model_name)
