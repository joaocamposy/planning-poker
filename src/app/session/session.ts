import { Model } from '../data/model';
import { ModelConfig } from '../data/model-config';

export class Session extends Model {
  id?: string;

  config(): ModelConfig {
    return {
      attributes: [],
      boot: () => {},
    };
  }
}
