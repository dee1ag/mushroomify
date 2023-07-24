import { Image, media, torch, torchvision } from 'react-native-pytorch-core';
import { ScanningResult } from '../types/types';

const transform = torchvision.transforms;

export const imageToTensor = (image: Image) => {
  const width = image.getWidth();
  const height = image.getHeight();

  const blob = media.toBlob(image);

  let tensor = torch.fromBlob(blob, [height, width, 3]);

  tensor = tensor.permute([2, 0, 1]);

  tensor = tensor.div(255);

  const centerCrop = transform.centerCrop(Math.min(width, height));

  tensor = centerCrop(tensor);

  const resize = transform.resize(384);

  tensor = resize(tensor);

  const normalize = transform.normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225]);

  tensor = normalize(tensor);

  tensor = tensor.unsqueeze(0);

  return tensor;
};

export const findMostFrequentWithAvgProbability = (results: ScanningResult[], topN: number) => {
  const countMap = new Map();

  results.forEach(element => {
    const elementId = element.id;

    if (countMap.has(elementId)) {
      countMap.set(elementId, countMap.get(elementId) + 1);
    } else {
      countMap.set(elementId, 1);
    }
  });

  const sortedCounts = Array.from(countMap.entries()).sort((a, b) => b[1] - a[1]);
  const topIds = sortedCounts.slice(0, topN).map(entry => entry[0]);

  const newResults: ScanningResult[] = [];

  topIds.forEach(id => {
    let sumProbability = 0;
    let count = 0;

    results.forEach(item => {
      if (item.id === id) {
        sumProbability += item.probability;
        count++;
      }
    });

    const averageProbability = sumProbability / count;

    newResults.push({ id, probability: averageProbability });
  });

  return newResults;
};
